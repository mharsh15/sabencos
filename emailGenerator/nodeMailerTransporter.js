//for node mailer initialization
var nodemailer = require("nodemailer")
module.exports = nodemailer.createTransport({

	host: "smtp-mail.outlook.com",
	secureConnection: false,
	port: 587,
	tls: {
		ciphers: "SSLv3",
	},
	auth: {
		user: 'sabencos@outlook.com',
		pass: "Bas#wt_83_#co"
	}
})