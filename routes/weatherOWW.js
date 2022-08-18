// routes for pulling data saved from OWW
const express = require("express")
const mongoose = require("mongoose")
const app = express()

//internal packages
const modelsObject = require('../models/weatherSchema')

const router = express.Router()
//router.set('query parser', 'simple');
//router to get data
router.get("/owweather", async (req, rep) => {

	const cityQ = req.query.q
	const { id } = req.query
	const pid = 3823189
	console.log(id == pid)
	const qCity = modelsObject.find(element => element.city == cityQ)
	console.log(qCity)
	if (id == pid) {
		if (qCity) {
			qCityResult = await qCity.model.find({}).limit(1).sort({ dt: -1 })
			if (qCityResult[0] != null) { rep.send(qCityResult[0]) }
			else { rep.status(400).send() }
		}

		else {
			rep.status(404).send()
		}
	}
	else {
		rep.status(403).send()
	}

})





module.exports = router
