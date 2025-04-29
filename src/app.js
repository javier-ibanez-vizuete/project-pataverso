import { loginScreenLauncher } from "./components/login-screen.js";
import { getDataFromStorage, saveDataInStorage } from "./helpers/storage.js";
import { sendingAFetch } from "./utils/fetchs.js";

export let sesionIsOpen = false;

if (getDataFromStorage("sesionIsOpen")) {
	sesionIsOpen = getDataFromStorage("sesionIsOpen");
} else {
	saveDataInStorage("sesionIsOpen", sesionIsOpen);
}

export const USERS_DATA = [
	{ nombre: "admin", email: "admin@admin.com", password: "adminadmin", allowToNewsLetter: true },
];

if (getDataFromStorage("usersData")) {
	USERS_DATA.push(getDataFromStorage("usersData"));
}
if (!getDataFromStorage("usersData")) {
	saveDataInStorage("usersData", USERS_DATA);
}

sendingAFetch();

document.addEventListener("DOMContentLoaded", () => {
	const btnClearStorage = document.querySelector(".clear-storage");
	const btnCloseProfile = document.querySelector(".cerrar-sesion");

	btnClearStorage.addEventListener("click", () => {
		localStorage.clear();
		window.location.reload();
	});
	btnCloseProfile.addEventListener("click", () => {
		saveDataInStorage("sesionIsOpen", false);
		loginScreenLauncher();
	})
	loginScreenLauncher();
});
