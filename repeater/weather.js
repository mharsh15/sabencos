//importing modules

const mongoose = require("mongoose")
const weatherModel = require("../models/weatherSchema")
const axios = require("axios")

//exporting it for using modular function
module.exports = async function () {
	try {
		for (let city of weatherModel) {
			console.log(city.city)
			mongoose.connection.op
			let url = `http://api.openweathermap.org/data/2.5/weather?q=${city.city}&APPID=ce6ced73b350b66f02a98737589a1dbe`
			let axiosData = await axios.get(url)
			//console.log(axiosData.data)
			if (axiosData.status === 200) {
				let weatherData = city.model(axiosData.data)
				await weatherData.save()
			}


		}
	}
	catch (error) {
		console.log(error)


	}
}