// this deals with default dashboard regions list and will be used in dashboard route
const regions = require("./newsRegions")
const newspaperCodes = require("./newsNameandCodes")
module.exports = [
	{ regionName: regions.india, newsCodes: [newspaperCodes.mnt, newspaperCodes.moco] },
	{ regionName: regions.apac, newsCodes: [newspaperCodes.straitTimes, newspaperCodes.smh] },
	{ regionName: regions.northAmerica, newsCodes: [newspaperCodes.wsj, newspaperCodes.cnbc] },
	{ regionName: regions.middleEast, newsCodes: [newspaperCodes.ans, newspaperCodes.htz] },

]