// this route takes care of all user related requests like updating a users name, password, functionalities

const express = require("express")
const router = express.Router()

//dependencies
//from firebase
const firebase = require("firebase-admin");
const errorNameList = require("../models/errorNameList");
const db = firebase.firestore();

// setting collection names for firebase
const userCollection = require("../models/firebaseUserModel")

//middlewares
router.get("/dashboard", async (req, rep) => {

	try {
		var userEmail = req.session.email
		const userCheck = await db.collection(userCollection.user).where('email', '==', userEmail).get()
		if (userCheck.docs.length == 1) {

			const user = userCheck.docs[0].data()
			//console.log(user)
			rep.render("userDash/userDashboard", { user })


		}

		else {
			rep.locals.flashError = errorNameList.notLoggedIn.message
			rep.redirect("/login")
		}

	}
	catch (e) {
		console.log(e)
		rep.locals.flashError = errorNameList.notLoggedIn.message
		rep.redirect("/login")
	}

})

module.exports = router