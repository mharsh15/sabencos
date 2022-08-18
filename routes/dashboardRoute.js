//this route is used for Displaying dashboard
const express = require('express')
const router = express.Router()
const newsModelNoImg = require("../models/newsModel")
const defaultRegionsList = require("../models/newsRegionList")
router.get("/", async (req, rep) => {
	let regions = []
	let counter = 0
	for (region of defaultRegionsList) {
		//console.log(region)
		//console.log(newsModelNoImg)

		const newsList = []
		for (indieNews of region.newsCodes) {
			//console.log(indieNews)
			newsList.push(newsModelNoImg.find(element => element.newsid == indieNews.newsCode))

		}

		regions.push({
			newsRegion: region.regionName, newsC: []
		})

		//console.log(newsList)
		for (news of newsList) {
			let result = await news.newsModel.find({}).limit(100).sort({ dt: -1 })
			//regions.push({ newsRegion: news.region, newsName: news.newsName, newsLogo: news.newsLogo, newsList: result })

			regions[counter]["newsC"].push({ newsName: news.newsName, newsLogo: news.newsLogo, newsList: result })
		}
		counter++
	}
	//console.log(regions)
	breakingNewsDefault = newsModelNoImg.find(element => element.newsid == "mnt")
	let breakings = await breakingNewsDefault.newsModel.find({}).limit(1).sort({ dt: -1 })
	//console.log(breakings)
	rep.render("dashboard/dashboard", { regions, breaking: breakings[0] })

})

module.exports = router

