//contains weather class 
//prod DB
//const mongoose = require("../mongoose/mongooseWeater")

//checking local db
//const mongoose = require("../mongoose/mngWthLocal")

const mongoose = require("mongoose")

//holds generic weather obtained from weather.org
const weatherSchema = new mongoose.Schema({}, { strict: false })
//for naming city objects
const citiesObject = {
	mumbai: "OWMweatherMumbai",
	pune: "OWMWeatherPune",
	singapore: "OWMWeatherSingapore",
	perth: "OWMWeatherPerth",
	auckland: "OWMWeatherAuckland",
	telaviv: "OWMWeatherTelAviv",
	berlin: "OWMWeatherBerlin",
	dublin: "OWMWeatherDublin",
	chennai: "OWMWeatherChennai"

}

//models per city
const mumbaiWeatherModel = mongoose.model(citiesObject.mumbai, weatherSchema)
const puneWeatherModel = mongoose.model(citiesObject.pune, weatherSchema)
const singaporeWeatherModel = mongoose.model(citiesObject.singapore, weatherSchema)
const perthWeatherModel = mongoose.model(citiesObject.perth, weatherSchema)
const aucklandWeatherModel = mongoose.model(citiesObject.auckland, weatherSchema)
const telavivWeatherModel = mongoose.model(citiesObject.telaviv, weatherSchema)
const berlinWeatherModel = mongoose.model(citiesObject.berlin, weatherSchema)
const dublinWeatherModel = mongoose.model(citiesObject.dublin, weatherSchema)
const chennaiWeatherModel = mongoose.model(citiesObject.chennai, weatherSchema)

const modelsObject = [
	{ city: "pune", model: puneWeatherModel },
	{ city: "mumbai", model: mumbaiWeatherModel },
	{ city: "singapore", model: singaporeWeatherModel },
	{ city: "perth", model: perthWeatherModel },
	{ city: "auckland", model: aucklandWeatherModel },
	{ city: "tel aviv", model: telavivWeatherModel },
	{ city: "berlin", model: berlinWeatherModel },
	{ city: "chennai", model: chennaiWeatherModel },
	{ city: "dublin, IE", model: dublinWeatherModel }

]
//exporting modules
// module.exports = { mumbaiWeatherModel, puneWeatherModel }
module.exports = modelsObject