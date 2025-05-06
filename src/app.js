import { loginScreenLauncher } from "./components/login-screen.js";
import { linksInteraction, openMobileNav } from "./helpers/buttons-nav.js";
import { getDataFromStorage, saveDataInStorage } from "./helpers/storage.js";

export let sesionIsOpen = false;

if (getDataFromStorage("sesionIsOpen")) {
	sesionIsOpen = getDataFromStorage("sesionIsOpen");
} else {
	saveDataInStorage("sesionIsOpen", sesionIsOpen);
}

export let USERS_DATA = [
	{ nombre: "admin", email: "admin@admin.com", password: "adminadmin", allowToNewsLetter: true },
];

if (getDataFromStorage("usersData")) {
	USERS_DATA = getDataFromStorage("usersData");
}
if (!getDataFromStorage("usersData")) {
	saveDataInStorage("usersData", USERS_DATA);
}

console.log("Que tengo en el local usersData ", getDataFromStorage("usersData"));

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
