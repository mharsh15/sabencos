//Packages External
const express = require('express')
const mongoose = require("mongoose")
const path = require('path')
const app = express()
const ejsMate = require('ejs-mate')
const cookieParser = require("cookie-parser")


//setting ejs
app.set('path', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

//middlewares
app.engine('ejs', ejsMate)

//for mail generation
var nodemailer = require("nodemailer")
app.use(express.urlencoded({ extended: true }))
//bcrypt for password hash
//const bcrypt = require("bcrypt")
//firebase setup
//for admin account firebase
var firebase = require("firebase-admin");
//var serviceAccount = require(path.join(__dirname, 'sabencos-users-firebase-adminsdk-n437y-2f788fdf5c.json'));


let prod = true
////////DATABASES
let mongooeWeather
let serviceAccount
if (prod) {
	//PRODUCTION DB
	mongooeWeather = require("./mongoose/mongooseWeater")
	serviceAccount = require(path.join(__dirname, 'sabencos-users-firebase-adminsdk-n437y-2f788fdf5c.json'));
}
else {
	//local DB
	mongooeWeather = require("./mongoose/mngWthLocal")
	serviceAccount = require(path.join(__dirname, 'sabencos-users-firebase-adminsdk-n437y-2f788fdf5c.json'));

}

//from google for admin initialization
firebase.initializeApp({
	credential: firebase.credential.cert(serviceAccount)
})
var db = firebase.firestore();
//for cookie parser
const session = require("express-session");

//initialize firestore session
const FirestoreStore = require("firestore-store")(session);
//ccookie parser
app.use(cookieParser());
app.use(
	session({
		store: new FirestoreStore({
			database: db,
			autoRemove: "interval",
			autoRemoveInterval: 10
		}),

		secret: "papa tiger",
		resave: false,
		maxAge: 365 * 24 * 60 * 60 * 1000,
		saveUninitialized: false,
	}))

// 60*60 *1000 means its 1 hr or 3600000 mil seconds
//
//prod DB
//const mongooeWeather = require("./mongoose/mongooseWeater")

//Local Test servers
//const mongooeWeather = require("./mongoose/mngWthLocal")

//////////////MIDDLEWARE FOR SEEING NEWS ROUTE ONLY WHEN USER IS LOGGED IN
//app.use("/news/*", (req, rep, next) => {
function sessionAccessMiddleware(req, rep, next) {
	//console.log(req.session.email)
	try {
		if (req.session.email) {
			next()
		}

		else {
			//rep.send("AINT AUTHORIZED TO SEE")
			//console.log("no email session")

			rep.redirect("/accesserrorlogin")
		}



	}
	catch (e) {

		console.log(e + "newsStarError")
		// req.flash("info", "Something went wrong")
		rep.redirect("/accesserrorlogin")
	}
}
////////Middleware for setting usertype for dashboard image
app.use((req, rep, next) => {
	try {
		if (req.session.email) {
			rep.locals.userType = req.session.userType

		}
		else {
			rep.locals.userType = null
			//console.log("no user")
		}

		rep.locals.flashInfo = null
		rep.locals.flashError = null
		next()

	}
	catch (e) {
		rep.locals.userType = null
		rep.locals.flashInfo = null
		rep.locals.flashError = null
		console.log(e + "Session_Middleware_Error")
		next()
	}

})
//


//ROUTES -API
const weatherRouterAPI = require("./routes/weatherOWW")
const newsRouterAPI = require("./routes/newsOWW")

//routes - web links
const newsDashRoute = require("./routes/dashboardRoute")
const newsRouter = require("./routes/newsRoute")

//users router web for login log off
const usersSessionRouter = require("./routes/usersSessionRoute")
//for user details and change in user requests
const userDetailsRouter = require("./routes/userDetailsRouter")


//get routes for API
app.use("/data/weather", weatherRouterAPI)
app.use("/data/news", newsRouterAPI)

//routes for news 
//dash
app.use("/news", sessionAccessMiddleware, newsRouter)
app.use("/user", sessionAccessMiddleware, userDetailsRouter)
app.use("/", newsDashRoute)

//
//routes for users
app.use("/", usersSessionRouter)

//routes for displaying News
app.get("*", (req, rep) => {
	rep.render("error/error")
})

app.use((err, req, rep, next) => {
	//console.log(req.session)
	if (req.session === undefined) {
		//console.log("session")
		rep.locals.userType = null
		return rep.render("error/error", { error: "Clear Your browser Cache. Some Error Happened" })
	}
	if (prod == false) {
		rep.render("error/error", { e: err })
	}
	else {
		rep.render("error/error", { e: null })
	}

	//rep.send({ error: err })

})
//listening to port
app.listen(3001, function () {
	console.log("Sabencos_portal@3001 Up and Running")
})