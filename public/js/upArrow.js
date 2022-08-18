const upArrow = document.querySelectorAll(".triangle")

upArrow.forEach(element => {

	element.addEventListener("click", () => {
		// console.log(element.style.transform)
		console.log(element.classList[1])
		const id = element.classList[1]
		const status = element.style.transform
		if (status == "" || status == "rotate(45deg)") {
			document.getElementById(id).style.display = "none"
			element.style.transform = "rotate(-135deg)"


		}
		else {
			document.getElementById(id).style.display = ""
			element.style.transform = "rotate(45deg)"
		}

	})

})