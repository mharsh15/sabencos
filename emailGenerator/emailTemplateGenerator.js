// below function generates email when a person is logging in
// and gets code to confirm email
function generateUserConfirmationEmailTemplate(userName, id) {
	return mailHeader +
		`<p> Dear ${userName}</p>
				<p> Welcome to SABENCOS, where you get news from around the world<p>
				<p> To access our services, we need you to click url below to confirm your emal id</p>
				<a href="http://www.sabencos.co.in/newuser/${id}">Click Here to Confirm</a>
				<p>Regards,</p>
				<p>Sabencos Team</P>

			`
		+ mailFooter

}

function generateUserPasswordLinkGeneratorTemplate(userName, id) {
	return mailHeader + `
			<p> Dear ${userName}</p >
				<p> Welcome to SABENCOS, where you get news from around the world<p>
				<p> A request was raised by you to reset your password Kindly Click the link below. Link expires in 30 Min</p>
				<a href="http://www.sabencos.co.in/reset/${id}">Click Here to reset Password</a>
				<p>Regards,</p>
				<p>Sabencos Team</P>`

		+ mailFooter
}

const mailHeader = `<html><head>
				<link rel="preconnect" href="https://fonts.googleapis.com">
					<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
						<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200&amp;display=swap" rel="stylesheet">
							<link href="https://fonts.googleapis.com/css2?family=Ewert&amp;family=KoHo:ital,wght@1,300&amp;display=swap" rel="stylesheet">

							</head><body>`+
	`<div style='background-color:black; color:white; align-items:center; text-align:center; font-size:30px; font-style: italic;'>SABENCOS <img style='width:25px; height:35px' src="https://sabencos.co.in/images/50_sabencos_trd.png" /></div>`
const mailFooter = `</body></html>`
module.exports = { generateUserConfirmationEmailTemplate, generateUserPasswordLinkGeneratorTemplate }