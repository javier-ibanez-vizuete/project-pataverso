import { getDataFromStorage } from "../helpers/storage.js";

const sectionsAnimations = () => {
	const sponsoredSection = document.querySelector(".section-sponsored-animals");
	const userDetailsSection = document.querySelector(".section-user-details");

	sponsoredSection.addEventListener("click", () => {
		const arrowIcons = sponsoredSection.querySelectorAll(".icon-arrow-container");
		const sectionAnimalsCards = document.querySelector(".sponsored-animals-cards-container");
		if (arrowIcons.length) {
			arrowIcons.forEach((icon) => icon.classList.toggle("icon-arrow-container-opened"));
		}
		if (!sectionAnimalsCards) {
			console.log("No se encuentró sectionAnimalsCards");
            return
		}
		sponsoredSection.classList.toggle("profile-section-opened");
		sectionAnimalsCards.classList.toggle("sponsored-animals-cards-container-opened");
	});

	userDetailsSection.addEventListener("click", () => {
		const arrowIcons = userDetailsSection.querySelectorAll(".icon-arrow-container");
		const sectionFormDetails = document.querySelector(".form-user-details");
		if (arrowIcons.length) {
			arrowIcons.forEach((icon) => icon.classList.toggle("icon-arrow-container-opened"));
		}
        if (!sectionFormDetails) {
            console.log("No se encontro sectionFormDetails");
            return
        }
        userDetailsSection.classList.toggle("profile-section-opened");
        sectionFormDetails.classList.toggle("form-user-details-opened");
	});
};

document.addEventListener("DOMContentLoaded", () => {
	sectionsAnimations();

	const nombre = document.getElementById("nombre");
	console.log(nombre);
	nombre.textContent = getDataFromStorage("currentUser").nombre;
});
