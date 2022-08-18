//JS File for all navigation related activities
//variables
//side nav variable
let toggleStatus = false;
const navBar = document.getElementById("side-nav")
const navHeader = document.querySelectorAll(".side-nav-sub-header")
const navBarIcon = document.querySelector("#side-nav-button-icon");
const navBarIconDiv = document.querySelector("#side-nav-button-div");
//for sidenav overhead display
const navBarSubDivOverlay = document.querySelector("#navbar-sub-div-overlay")
const subdivOverlayDiv = document.querySelector("#navbar-sub-div-overlay-div")

const sidenavSubDiv = document.querySelectorAll(".side-nav-sub-div");
// width variables of side nav
const sideWidthMin = "45px";
const sideWidthMax = "150px";
//setting default width at start for animation to work
navBar.style.width = sideWidthMin;

function navButton() {
	//alert("Hi")
	toggleStatus = !toggleStatus;
	if (toggleStatus) {
		navBar.style.width = sideWidthMax;
		// for button hamburger
		navBarIcon.innerHTML = "&#215";
		navBarIconDiv.style.textAlign = "end";


	}
	else {
		navBar.style.width = sideWidthMin;
		navBarIcon.innerHTML = "&#9776";
		navBarIconDiv.style.textAlign = "center";

	}


	//navBar.classList.toggle("side-nav-visible")
	navHeader.forEach(element => {
		if (toggleStatus) {
			element.style.visibility = "visible";
			element.style.width = "auto";
			element.style.textOverflow = "clip"

		}
		else {
			element.style.visibility = "collapse"
			element.style.width = 0;

		}

	});

}

sidenavSubDiv.forEach(element => {
	element.addEventListener("click", () => {
		//to clone div

		let links = element.children[2].cloneNode(true)
		console.log(links)
		links.classList.remove("side-nav-sub-sub-links")
		subdivOverlayDiv.appendChild(links)
		//element.appendChild(links)
		navBarSubDivOverlay.style.display = "block";


	})

})

function closeOverlay() {
	navBarSubDivOverlay.style.display = "none";
	subdivOverlayDiv.removeChild(subdivOverlayDiv.lastChild)
}
