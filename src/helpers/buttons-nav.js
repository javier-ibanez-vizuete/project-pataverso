import { getDataFromStorage, saveDataInStorage } from "./storage.js";

export const openMobileNav = () => {
	const btnBurgerMenu = document.querySelector(".image-burger-menu-container");
	const btnCloseMobileNav = document.querySelector(".btn-closing-mobile-nav");
	const mobileNav = document.querySelector("#mobile-navigator");
	// const mobileNav2 = document.querySelector(".mobile-navigator-animal");

	btnBurgerMenu.addEventListener("click", () => {
		console.log("HACIENDO CLICK EN EL MENU HAMBURGUESA");
		console.log("Que vale mobilNav", mobileNav);
		mobileNav.classList.add("pop-up-mobile-nav");
		console.log("ESTO SE HACE");
	});

	btnCloseMobileNav.addEventListener("click", () => {
		mobileNav.classList.remove("pop-up-mobile-nav");
	});
};

export const linksInteraction = () => {
	const perrichuchos = document.querySelector(".perrichuchos-nav-container");
	const gaticornios = document.querySelector(".gaticornios-nav-container");
	const conejaurios = document.querySelector(".conejaurios-nav-container");

	perrichuchos.addEventListener("click", (event) => {
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
	conejaurios.addEventListener("click", (event) => {
		event.preventDefault();
		saveDataInStorage("animalFetch", "conejo");
		saveDataInStorage("pataAnimalName", "Conejaurios");
		window.location.href = "/pages/animal.html";
	});
};
