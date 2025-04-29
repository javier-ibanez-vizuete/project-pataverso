import { loginScreenLauncher } from "./components/login-screen.js";
import { getDataFromStorage, saveDataInStorage } from "./helpers/storage.js";

export let sesionIsOpen = false;

if (getDataFromStorage("sesionIsOpen")) {
	sesionIsOpen = getDataFromStorage("sesionIsOpen");
} else {
	saveDataInStorage("sesionIsOpen", sesionIsOpen);
}

export const USERS_DATA = [];

if (getDataFromStorage("usersData")) {
	USERS_DATA.push(getDataFromStorage("usersData"))
}
if (!getDataFromStorage("usersData")) {
	saveDataInStorage("usersData", USERS_DATA);
}

const sendingAFetch = async () => {
	try {
		const response = await fetch("https://huachitos.cl/api/animales");
		if (!response.ok) {
			throw new Error("NEW ERROR");
		}
		const data = await response.json();
		const animales = data.data;
		animales.forEach((animal) => {
			// console.log(animal.tipo);
		});
	} catch (error) {
		// console.log("error.message", error);
	}
};

sendingAFetch();


document.addEventListener("DOMContentLoaded", () => {
	const btnClearStorage = document.querySelector(".clear-storage");

	btnClearStorage.addEventListener("click", () => {
		localStorage.clear();
		window.location.reload();
	})
	loginScreenLauncher();
})