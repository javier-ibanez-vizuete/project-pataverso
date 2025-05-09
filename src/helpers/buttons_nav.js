import { saveDataInStorage } from "./storage.js";

export const openMobileNav = () => {
	const btnBurgerMenu = document.querySelector(".image-burger-menu-container");
	const btnCloseMobileNav = document.querySelector(".btn-closing-mobile-nav");
	const mobileNav = document.querySelector("#mobile-navigator");

	btnBurgerMenu.addEventListener("click", () => {
		mobileNav.classList.add("pop-up-mobile-nav");
	});

	btnCloseMobileNav.addEventListener("click", () => {
		mobileNav.classList.remove("pop-up-mobile-nav");
	});
};

export const linksInteraction = () => {
	const perrichuchos = document.querySelector(".perrichuchos-nav-container");
	const gaticornios = document.querySelector(".gaticornios-nav-container");
	const conejaurios = document.querySelector(".conejaurios-nav-container");
	const perrichuchosDesktop = document.querySelector(".perrichuchos-nav-desktop-container");
	const gaticorniosDesktop = document.querySelector(".gaticornios-nav-desktop-container");
	const conejauriosDesktop = document.querySelector(".conejaurios-nav-desktop-container");

	perrichuchos.addEventListener("click", (event) => {
		event.preventDefault();
		saveDataInStorage("animalFetch", "perro");
		saveDataInStorage("pataAnimalName", "Perrichuchos");
		window.location.href = "/pages/animal.html";
	});
	perrichuchosDesktop.addEventListener("click", (event) => {
		event.preventDefault();
		saveDataInStorage("animalFetch", "perro");
		saveDataInStorage("pataAnimalName", "Perrichuchos");
		window.location.href = "/pages/animal.html";
	});
	gaticornios.addEventListener("click", (event) => {
		event.preventDefault();
		saveDataInStorage("animalFetch", "gato");
		saveDataInStorage("pataAnimalName", "Gaticornios");
		window.location.href = "/pages/animal.html";
	});
	gaticorniosDesktop.addEventListener("click", (event) => {
		event.preventDefault();
		saveDataInStorage("animalFetch", "gato");
		saveDataInStorage("pataAnimalName", "Gaticornios");
		window.location.href = "/pages/animal.html";
	});
	conejaurios.addEventListener("click", (event) => {
		event.preventDefault();
		saveDataInStorage("animalFetch", "conejo");
		saveDataInStorage("pataAnimalName", "Conejaurios");
		window.location.href = "/pages/animal.html";
	});
	conejauriosDesktop.addEventListener("click", (event) => {
		event.preventDefault();
		saveDataInStorage("animalFetch", "conejo");
		saveDataInStorage("pataAnimalName", "Conejaurios");
		window.location.href = "/pages/animal.html";
	});
};
