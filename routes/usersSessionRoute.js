//initializing variables
const express = require("express")
const router = express.Router()

//bcrypt for password hash
const bcrypt = require("bcrypt")

//from firebase
const firebase = require("firebase-admin");
const db = firebase.firestore();

//setting email route
const transporter = require("../emailGenerator/nodeMailerTransporter")

// setting collection names for firebase
const userCollection = require("../models/firebaseUserModel")

//catch Async
const catchAsync = require("../errormodule/catchAsync")
//for generating email
const { generateUserConfirmationEmailTemplate, generateUserPasswordLinkGeneratorTemplate } = require("../emailGenerator/emailTemplateGenerator")
//user type
const userType = {
	admin: "admin",
	privleged: "privleged",
	new: "new",
	temprory: "temprory"
}
//settting email template
var newUserTemplate = {
	from: "sabencos@outlook.com",
	text: "Dear User, welcome to sabencos",
	html: "<a><a>"
}
//for user messages
const errorNameList = require("../models/errorNameList");

// NEW USER GET/POST ROUTES
// router rendering signup page
router.get("/newuser", (req, rep) => {
	rep.render("users/signup")

})
//add user post route
router.post("/newuser", catchAsync(async (req, rep) => {
	//console.log(req.body.login);
	const { email, password } = req.body.login;
	const userCheck = await db.collection(userCollection.user).where('email', '==', email).get()
	//console.log(userCheck.docs.length)
	if (userCheck.docs.length == 0) {
		//const user = await db.collection('users').add(req.body.login);
		const newUser = req.body.login
		newUser.endConfirmationTime = Math.floor(new Date().getTime() / 1000) + 60 * 30
		newUser.password = await bcrypt.hash(password, 10)
		newUser.userType = userType.temprory
		user = await db.collection(userCollection.unconfirmed).add(newUser);
		//req.session.email = email
		newUserTemplate.to = email,
			newUserTemplate.subject = "Confirm Email ID for confirming Account",
			newUserTemplate.html = generateUserConfirmationEmailTemplate(newUser.firstName, user.id)



		transporter.sendMail(newUserTemplate, (error, info) => {
			if (error) {
				console.log(error)

			}
		})

		//rep.redirect("/login")
		rep.locals.flashInfo = errorNameList.confirmEmail.message
		rep.render("users/signup")
		return
	}
	rep.locals.flashError = errorNameList.userAlreadyPresent.message
	rep.render("users/signup")
	//rep.send("User Exists")
	//rep.redirect("/newuser")


}))
//confirm user
router.get("/newuser/:id", catchAsync(async (req, rep) => {

	const { id } = req.params
	//console.log(id)
	const user = await db.collection(userCollection.unconfirmed).doc(id).get();

	if (user.data()) {
		const userCheck = await db.collection(userCollection.user).where('email', '==', user.data().email).get()
		if (userCheck.docs.length == 0) {
			let confirmUserData = user.data()
			delete confirmUserData.endConfirmationTime
			confirmUserData.userType = userType.new
			await db.collection(userCollection.user).add(confirmUserData);
			//console.log(user.data().email)
			await db.collection(userCollection.unconfirmed).doc(id).delete()

			rep.locals.flashInfo = errorNameList.accountCreated.message

			// old route -> rep.redirect("/login")
			return rep.render("users/login")
		}
		else {
			rep.locals.flashError = errorNameList.userAlreadyPresent.message
			rep.render("users/newuser")
			// old route ->rep.send("User Exists.")
		}

	}
	else {
		rep.locals.flashError = errorNameList.linkExpired.message
		rep.render("users/login")

	}

	//

}))
// *************LOGIN LOGOUT ROUTES********************
//login route
router.get("/login", (req, rep) => {
	if (!req.session.email) { rep.render("users/login") }
	else { rep.redirect("/") }

})
//login route with message when user accesses non logged in routes
router.get("/accesserrorlogin", (req, rep) => {
	if (!req.session.email) {
		rep.locals.flashError = errorNameList.notLoggedIn.message
		rep.render("users/login")
	}
	else { rep.redirect("/") }

})
//post route for logging in
router.post("/login", catchAsync(async (req, rep) => {
	//console.log(req.body.login);
	const { email, password } = req.body.login;
	//console.log("in Login Route")
	const user = await db.collection(userCollection.user).where('email', '==', email).get()
	//console.log(user.docs.length)
	if (user.docs.length == 1) {
		const passStatus = await bcrypt.compare(password, user.docs[0].data().password)
		if (passStatus) {
			//console.log("in Pass Status")
			// req.session.email = email
			// transporter.sendMail(newUserTemplate, (error, info) => {
			// 	if (error) {
			// 		console.log(error)
			// 	}
			// })
			req.session.email = email;
			req.session.userType = userType.new;
			req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000; // for one year 365 * 24 * 60 * 60 * 1000;
			req.session.save((function (err) {
				if (err) {
					//req.flash("info", "err")
					//return rep.redirect("/login")
					rep.locals.flashError = "Err"
					return rep.render("users/login")
				}
				return rep.redirect("/")

			}))

		}
		else {

			//req.flash("info", "Password did not match")
			// actual working return rep.redirect("/login")
			rep.locals.flashError = errorNameList.passwordDidNotMatch.message
			rep.render("users/login")
			//rep.send("Password did not match")
		}
	}
	else {
		//req.flash("info", "User does not exists")
		rep.redirect("/newuser")
	}


	//rep.send(req.body.login)
}))
// ***********************ROUTE FOR PASSWORD RESET************************///
router.get("/reset", (req, rep) => {

	rep.render("users/resetPasswordEmailForm")

})
router.post("/reset", catchAsync(async (req, rep) => {

	const { email } = req.body.login

	const userCheck = await db.collection(userCollection.user).where('email', '==', email).get()
	//console.log(userCheck.docs.length)
	if (userCheck.docs.length == 1) {
		//console.log(userCheck.docs[0].data())
		const currentUser = userCheck.docs[0].data()
		const userPasswordReset = { userID: userCheck.docs[0].id, username: currentUser.firstName }
		userPasswordReset.endConfirmationTime = Math.floor(new Date().getTime() / 1000) + 60 * 30
		const user = await db.collection(userCollection.passwordReset).add(userPasswordReset);
		newUserTemplate.to = email,
			newUserTemplate.subject = "Change Password",
			newUserTemplate.html = generateUserPasswordLinkGeneratorTemplate(currentUser.firstName, user.id)

		transporter.sendMail(newUserTemplate, (error, info) => {
			if (error) {
				console.log(error)

			}
		})
		rep.locals.flashInfo = "Email has been sent to your email ID. Check your email and click link to reset password"


	}
	else {
		rep.locals.flashError = "User does not exists"
	}
	rep.render("users/resetPasswordEmailForm")
}))
//creates userform 
router.get("/reset/:id", catchAsync(async (req, rep) => {

	let { id } = req.params
	const userPasswordReset = await db.collection(userCollection.passwordReset).doc(id).get();

	if (userPasswordReset.data()) {
		const user = userPasswordReset.data()

		rep.render("users/resetPasswordForm", { user, uid: userPasswordReset.id })
	}
	else {
		rep.redirect("/login")
	}


}))

router.post("/reset/:id", catchAsync(async (req, rep) => {
	let { id } = req.params
	const { password } = req.body.login
	//console.log(id)
	const userChangeRequest = await db.collection(userCollection.passwordReset).doc(id).get();
	//console.log(userChangeRequest.data())
	if (userChangeRequest.data()) {

		const userID = userChangeRequest.data().userID;
		const user = await db.collection(userCollection.user).doc(userID)
		const hashPassword = await bcrypt.hash(password, 10)
		//console.log(hashPassword)
		//	if (user.data()) {
		await user.update({ password: hashPassword })
		await db.collection(userCollection.passwordReset).doc(id).delete()

		return rep.redirect("/login")
		//return rep.send(req.body);

		//	}
		// else rep.send("User Does Not Exixts")


	}
	rep.send("Link Expired")
}))
//************************Post rounte for logout ************************///
router.post("/logout", catchAsync(async (req, rep) => {

	if (req.session.email) {
		//console.log(req.session.id)
		await db.collection(userCollection.userSessions).doc(req.session.id).delete()
		req.session = null;
		// req.session.destroy((err) => { console.log(err) });
		return rep.redirect("/login")
	}
	rep.send("no Logins")

}))
module.exports = router