const newsSource = require("../models/newsModel")
const express = require("express")
const router = express.Router()


router.get("/:id", async (req, rep) => {
	const { id } = req.params
	news = newsSource.find(newsSource => newsSource.newsid == id)
	if (news) {
		const newsSource = {
			newsName: news.newsName,
			newsLogo: news.newsLogo,
			newsList: []
		}
		for (source of news.newsUrls) {
			//console.log(source.category)
			const lists = await news.newsModel.find({ "category": source.category }).limit(100).sort({ dt: -1 })
			newsSource.newsList.push({ category: source.category, lists })
		}

		rep.render("news/news", { newsSource })
	}
	else {
		rep.status(404).send()
	}

})

module.exports = router