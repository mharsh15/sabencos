//node level imports
const mongoose = require("mongoose")
const schema = require("../models/newsSchema")
const newspaperCodes = require("./newsNameandCodes")
const newsRegion = require("./newsRegions")
//url imports
const straitTimesUrl = require("../rss_url/straitTimesUrl")
const wsjUrls = require("../rss_url/wsjUrls")
const smhUrls = require("../rss_url/smhUrls")
const arabNewsUrls = require("../rss_url/arabNewsUrls")
const haaretzUrls = require("../rss_url/haaretzUrls")
const mintUrls = require("../rss_url/mintUrls")
const cnbcUrls = require("../rss_url/cnbcUrls")
const mocoUrls = require("../rss_url/moneyControlUrls")

//schemas for news sources
const straitTimesModel = mongoose.model("newsstraittimes", schema)
const wsjModel = mongoose.model("newswsj", schema)
const smhModel = mongoose.model("newssmh", schema)
const arabNewsModel = mongoose.model("newsarab", schema)
const haaretzModel = mongoose.model("newshaaretz", schema)
const mintModel = mongoose.model("newsmint", schema)
const cnbcModel = mongoose.model("newscnbc", schema)
const mocoModel = mongoose.model("newsmoco", schema)

module.exports = [
	{ newsModel: straitTimesModel, newsid: newspaperCodes.straitTimes.newsCode, newsName: newspaperCodes.straitTimes.newsName, newsUrls: straitTimesUrl, newsLogo: "https://www.straitstimes.com/favicon.ico?sub1=20220329-2146-1226-8ddd-23296977fc8c", region: newsRegion.apac },
	{ newsModel: smhModel, newsid: newspaperCodes.smh.newsCode, newsName: newspaperCodes.smh.newsName, newsUrls: smhUrls, newsLogo: "https://www.smh.com.au/apple-touch-icons/smh.png", region: newsRegion.apac },
	{ newsModel: wsjModel, newsid: newspaperCodes.wsj.newsCode, newsName: newspaperCodes.wsj.newsName, newsUrls: wsjUrls, newsLogo: "https://s.wsj.net/img/meta/wsj_favicon.svg", region: newsRegion.northAmerica },
	{ newsModel: arabNewsModel, newsid: newspaperCodes.ans.newsCode, newsName: newspaperCodes.ans.newsName, newsUrls: arabNewsUrls, newsLogo: "https://www.arabnews.com/sites/default/files/index23.png", region: newsRegion.middleEast },
	{ newsModel: haaretzModel, newsid: newspaperCodes.htz.newsCode, newsName: newspaperCodes.htz.newsName, newsUrls: haaretzUrls, newsLogo: "https://www.haaretz.com/hdc/web/images/apple-touch-icon-180x180.png", region: newsRegion.middleEast },
	{ newsModel: mintModel, newsid: newspaperCodes.mnt.newsCode, newsName: newspaperCodes.mnt.newsName, newsUrls: mintUrls, newsLogo: "https://images.livemint.com/icons/mintfavi.svg", region: newsRegion.india },
	{ newsModel: cnbcModel, newsid: newspaperCodes.cnbc.newsCode, newsName: newspaperCodes.cnbc.newsName, newsUrls: cnbcUrls, newsLogo: "https://www.cnbc.com/favicon.ico", region: newsRegion.northAmerica },
	{ newsModel: mocoModel, newsid: newspaperCodes.moco.newsCode, newsName: newspaperCodes.moco.newsName, newsUrls: mocoUrls, newsLogo: "https://images.moneycontrol.com/images/responsive/common/apple-touch-icon.png", region: newsRegion.india },
]
