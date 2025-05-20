import { loginScreenLauncher } from "./components/login_screen.js";
import { ANIMALS_DATA_BACKUP } from "./helpers/animals_backUp.js";
import { linksInteraction, openMobileNav } from "./helpers/buttons_nav.js";
import { getDataFromStorage, saveDataInStorage } from "./helpers/storage.js";
import { handleNavViews } from "./utils/handle-aria.js";

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

if (getDataFromStorage("animalsData")) {
	ANIMALS_DATA_BASE = getDataFromStorage("animalsData");
}
if (!getDataFromStorage("animalsData")) {
	saveDataInStorage("animalsData", ANIMALS_DATA_BASE);
}
/**
 * Asynchronously fetches and initializes animal data (dogs, cats, rabbits) on the first render.
 *
 * This function checks if the local `ANIMALS_DATA_BASE` is empty for each animal type.
 * If so, it performs a fetch request to the API for that specific type (`perro`, `gato`, or `conejo`).
 * The fetched data is then stored in `ANIMALS_DATA_BASE` and persisted using `saveDataInStorage`.
 *
 * Animal Types handled:
 *  - perro (dog)
 *  - cat (cat)
 *  - conejo (rabbit)
 *
 * On failure of any fetch operation an error is logged to the console and use ANIMALS_DATA_BACKUP as back up.
 *
 * @async
 * @function firstRender
 * @returns Resolve once all necessary data has benn fetched and storage.
 */
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
		ANIMALS_DATA_BASE = ANIMALS_DATA_BACKUP;
		saveDataInStorage("animalsData", ANIMALS_DATA_BASE);
	}
};

export let USERS_DATA = [
	{
		id: 1,
		nombre: "admin",
		email: "admin@admin.com",
		password: "adminadmin",
		allowToNewsLetter: true,
		is_banned: false,
		sponsoring: [],
		sponsor_details: {
			nombre_completo: "Admin Admin Admin",
			telefono: "",
			pais: "botnia",
			sponsor_reason: "",
			notification_type: true,
			colaboration_type: "payment-monthly",
			colaboration_time: "no-limit",
			participation_events: true,
		},
	},
];

if (getDataFromStorage("usersData")) {
	USERS_DATA = getDataFromStorage("usersData");
}
if (!getDataFromStorage("usersData")) {
	saveDataInStorage("usersData", USERS_DATA);
}

document.addEventListener("load", handleNavViews);
document.addEventListener("resize", handleNavViews);

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
	handleNavViews();
});
