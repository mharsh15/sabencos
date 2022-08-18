///API for Getting data for each news source
const code = require("../variables/lockIds")
const newsSource = require("../models/newsModel")
const express = require("express")

//initialising router

const router = express.Router()

router.use((req, rep, next) => {
	console.log("into news api router")
	let { news } = req.query
	let { id } = req.query
	let { topic } = req.query

	if (id == code && news && topic) { next() }
	else if (!id == code) { rep.statusCode(400).send("Wrong ID") }
	else if (!id) { rep.status('400').send("cannot authenticate ID") }

	else { rep.status(400).send("News and/or topic parameter not added") }


})
//starting  Loop
//gets all news max 50 from a particular category
router.get("/maxcatnews", async (req, rep) => {
	//news 
	console.log("into news api router")
	let { news } = req.query
	let { id } = req.query
	let { topic } = req.query
	let newsList = newsSource.find(nc => nc.newsid == news)
	console.log("into news api " + news)
	if (newsList) {
		const data = await newsList.newsModel.find({ "category": topic }).limit(60).sort({ dt: -1 })
		//qCityResult = await qCity.model.find({}).limit(1).sort({ dt: -1 })
		if (data) { rep.send(data) }
		else rep.status(404).send()
	}
	else { rep.status(404).send() }


})

module.exports = router
