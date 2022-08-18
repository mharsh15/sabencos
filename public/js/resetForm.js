// for password reset
function resetPassword() {
	//alert("HI")
	let password = document.getElementById("password").value;
	let passwordCheck = document.getElementById("passwordCheck").value;
	let id = document.getElementById("rid").innerHTML;
	//console.log(id)
	//alert(id)
	//console.log("GRR")
	//console.log(password)
	//console.log(passwordCheck)
	const form = document.getElementById("passwordReset")
	if (password == passwordCheck && password != "" && passwordCheck != "") {
		//alert("Matches");

		form.action = `/reset/${id}`;
		form.method = 'POST';
		form.submit()
	}
	else {
		alert("Password not matching");
		// form.preventDefault()

	}


}