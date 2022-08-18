//this is used for as a common schema for all news source

const mongoose = require("mongoose")
const newsSchema = new mongoose.Schema({
	title: { type: String, require: true },
	description: { type: String, require: true },
	publisher: { type: String, require: true },
	category: { type: String, require: true },
	dt: { type: Number, require: true },
	image_url: { type: String },
	article_url: {
		type: String,
		require: true
	},
	key_word: [{ type: String }]

})
module.exports = newsSchema