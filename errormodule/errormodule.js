var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/sabencosError',
	{ useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to Internam ERROR MongoDB")
	})
	.catch(error => {
		console.log("Error connecting to mongoDB")
		console.log(error);

	})

let errorSchema = new mongoose.Schema({}, { strict: false })

modules.export = mongoose.modules("sabencoserror", errorSchema)