import { removeFromStorage, saveDataInStorage } from "./storage.js";

/**
 * Sets up event listeners to open and close the movile navigation menu.
 * 
 * This function binds click handlers to the burger menu button and the close
 * button. Clicking the burger menu adds a class to display the mobile nav,
 * while clicking the close button removes that class to hide it.
 * 
 * @function openMobileNav
 */
export const openMobileNav = () => {
	const btnBurgerMenu = document.querySelector(".image-burger-menu-container");
	const btnCloseMobileNav = document.querySelector(".btn-closing-mobile-nav");
	const mobileNav = document.querySelector("#mobile-navigator");

	btnBurgerMenu.addEventListener("click", () => {
		mobileNav.classList.add("pop-up-mobile-nav");
		mobileNav.setAttribute("aria-expanded", "true")
		console.log("HACIENDO CLICK");
	});

	btnCloseMobileNav.addEventListener("click", () => {
		mobileNav.classList.remove("pop-up-mobile-nav");
		mobileNav.setAttribute("aria-expanded", "false")
	});
};

/**
 * Attaches click handlers to animal navigation links for both mobile and desktop views
 * 
 * This function selects the navigation container for dogs, cats, and rabbits,
 * and registers click events that prevent default link behavior, store the
 * chosen animal type and display name in local storage, and navigate to the
 * animal listing page.
 * 
 * @function linksInteraction
 */
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

export const logoutprofile = () => {
	const logout = document.querySelectorAll(".cerrar-sesion");
	if (!logout.length) {
		console.error("No se encontro '.cerrar-sesion'");
		return
	}

	logout.forEach((button) => {
		button.addEventListener("click", () => {
			saveDataInStorage("sesionIsOpen", false);
			removeFromStorage("currentUser");
			window.location.href = "/index.html";
		})
	})
};