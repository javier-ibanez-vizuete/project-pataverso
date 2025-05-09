import { loginScreenLauncher } from "./components/login_screen.js";
import { linksInteraction, openMobileNav } from "./helpers/buttons_nav.js";
import { getDataFromStorage, saveDataInStorage } from "./helpers/storage.js";

export let sesionIsOpen = false;

if (getDataFromStorage("sesionIsOpen")) {
	sesionIsOpen = getDataFromStorage("sesionIsOpen");
} else {
	saveDataInStorage("sesionIsOpen", sesionIsOpen);
}

let ANIMALS_DATA_BASE = {
	perro: [],
	gato: [],
	conejo: [],
};

export const firstRender = async () => {
	try {
		if (!ANIMALS_DATA_BASE.perro.length) {
			const response = await fetch(`https://huachitos.cl/api/animales/tipo/${"perro"}`);
			if (!response.ok) {
				throw new Error("NEW ERROR");
			}
			const data = await response.json();
			const animales = data.data;
			animales.forEach((animal) => {
				ANIMALS_DATA_BASE.perro.push(animal);
			});
			saveDataInStorage("animalsData", ANIMALS_DATA_BASE);
		}
		if (!ANIMALS_DATA_BASE.gato.length) {
			const response = await fetch(`https://huachitos.cl/api/animales/tipo/${"gato"}`);
			if (!response.ok) {
				throw new Error("NEW ERROR");
			}
			const data = await response.json();
			const animales = data.data;
			animales.forEach((animal) => {
				ANIMALS_DATA_BASE.gato.push(animal);
			});
			saveDataInStorage("animalsData", ANIMALS_DATA_BASE);
		}
		if (!ANIMALS_DATA_BASE.conejo.length) {
			const response = await fetch(`https://huachitos.cl/api/animales/tipo/${"conejo"}`);
			if (!response.ok) {
				throw new Error("NEW ERROR");
			}
			const data = await response.json();
			const animales = data.data;
			animales.forEach((animal) => {
				ANIMALS_DATA_BASE.conejo.push(animal);
			});
			saveDataInStorage("animalsData", ANIMALS_DATA_BASE);
		}
	} catch (error) {
		console.error("there is an error on first render ", error);
	}
};

if (getDataFromStorage("animalsData")) {
	ANIMALS_DATA_BASE = getDataFromStorage("animalsData");
}
if (!getDataFromStorage("animalsData")) {
	saveDataInStorage("animalsData");
}

export let USERS_DATA = [
	{ nombre: "admin", email: "admin@admin.com", password: "adminadmin", allowToNewsLetter: true, banned: false },
];

if (getDataFromStorage("usersData")) {
	USERS_DATA = getDataFromStorage("usersData");
}
if (!getDataFromStorage("usersData")) {
	saveDataInStorage("usersData", USERS_DATA);
}

document.addEventListener("DOMContentLoaded", () => {
	// const btnResetStorage = document.querySelector(".clear-storage");
	const btnCloseProfile = document.querySelectorAll(".cerrar-sesion");

	// btnResetStorage.addEventListener("click", deleteLocalStorage);
	btnCloseProfile.forEach((btn) => {
		btn.addEventListener("click", () => {
			saveDataInStorage("sesionIsOpen", false);
			window.location.reload();
		});
	});
	loginScreenLauncher();
	openMobileNav();
	linksInteraction();
});
