import { loginScreenLauncher } from "../components/login-screen.js";
import { openMobileNav, linksInteraction } from "../helpers/buttons-nav.js";
import { getDataFromStorage, saveDataInStorage } from "../helpers/storage.js";
import { sendingAFetch } from "../utils/fetchs.js";

export const animals = [];

let animal = "perro";

if (getDataFromStorage("animalFetch")) {
	animal = getDataFromStorage("animalFetch");
}

if (!getDataFromStorage("animalFetch")) {
	saveDataInStorage("animalFetch", animal);
}

let pataAnimalName = "Perrichuchos";

if (getDataFromStorage("pataAnimalName")) {
	pataAnimalName = getDataFromStorage("pataAnimalName");
}

if (!getDataFromStorage("pataAnimalName")) {
	saveDataInStorage("pataAnimalName", pataAnimalName);
}

if (animal === "perro") {
	pataAnimalName = "Perrichuchos";
	saveDataInStorage("pataAnimalName", pataAnimalName);
}
if (animal === "gato") {
	pataAnimalName = "Gaticornios";
	saveDataInStorage("pataAnimalName", pataAnimalName);
}
if (animal === "conejo") {
	pataAnimalName = "Conejaurios";
	saveDataInStorage("pataAnimalName", pataAnimalName);
}

export const renderAnimal = async (animal) => {
	await sendingAFetch(animal);

	animals.forEach((animalFounded) => {
		console.log(animalFounded);
	})
};

document.addEventListener("DOMContentLoaded", () => {
	const btnCloseProfile = document.querySelectorAll(".cerrar-sesion");
	const h1 = document.querySelector(".h1-animal-page");

	document.title = `Pataverso | ${pataAnimalName.toUpperCase()}`
	h1.textContent = `${pataAnimalName.toUpperCase()}`

	btnCloseProfile.forEach((btn) => {
		btn.addEventListener("click", () => {
			saveDataInStorage("sesionIsOpen", false);
			window.location.href = "/index.html";
		});
	});

	loginScreenLauncher();
	renderAnimal(animal);
	linksInteraction();
	openMobileNav();
});
