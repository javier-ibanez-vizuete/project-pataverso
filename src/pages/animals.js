import { loginScreenLauncher } from "../components/login-screen.js";
import { openMobileNav, linksInteraction } from "../helpers/buttons-nav.js";
import { getDataFromStorage, saveDataInStorage } from "../helpers/storage.js";
import { sendingAFetch } from "../utils/fetchs.js";

export const animals = [];

let animal = "perro";

console.log("ANIMAL DESPUES DE CREARLO", animal);

if (getDataFromStorage("animalFetch")) {
	animal = getDataFromStorage("animalFetch");
}
console.log("ANIMAL DESPUES ACTUALIZARLO", animal);

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
export const renderAnimal = async (animal) => {
	await sendingAFetch(animal);

	animals.forEach((animalFounded) => {
		// console.log(animalFounded);
	});
};

const recalculateFilters = () => {
	const spanFiltersActivated = document.querySelector(".span-filters-counter");
	const filterElements = document.querySelectorAll(".filter-counter");
	let numberOFFilter = 0;

	filterElements.forEach((filter) => {
		if (filter.value !== filter.options[0].textContent) {
			numberOFFilter += 1;
		}
	});
	spanFiltersActivated.textContent = numberOFFilter;
};

const handleFiltersSection = () => {
	const btnOpenCloseFilters = document.querySelector(".btn-open-close-filter-container");
	const containerFilters = document.querySelector(".expand-filters-menu");
	const filtersform = document.querySelector(".filters-mobile-section-container");
	const btnResetFilters = document.querySelector(".btn-reset-filters");

	btnOpenCloseFilters.addEventListener("click", (event) => {
		event.preventDefault();
		containerFilters.classList.toggle("dont-show");
	});

	filtersform.addEventListener("change", recalculateFilters);

	btnResetFilters.addEventListener("click", (event) => {
		event.preventDefault();
		filtersform.reset();
		recalculateFilters();
	});
};

const handleTitlesSection = async () => {
	const h1 = document.querySelector(".h1-animal-page");
	const currentAnimal = await getDataFromStorage("pataAnimalName");
	console.log("Que vale currentAnimal", currentAnimal);
	// if (animal === "perro") {
	// 	pataAnimalName = "Perrichuchos";
	// 	saveDataInStorage("pataAnimalName", pataAnimalName);
	// }
	// if (animal === "gato") {
	// 	pataAnimalName = "Gaticornios";
	// 	saveDataInStorage("pataAnimalName", pataAnimalName);
	// }
	// if (animal === "conejo") {
	// 	pataAnimalName = "Conejaurios";
	// 	saveDataInStorage("pataAnimalName", pataAnimalName);
	// }

	document.title = `Pataverso | ${currentAnimal.toUpperCase()}`;
	h1.textContent = `${currentAnimal.toUpperCase()}`;
};

document.addEventListener("DOMContentLoaded", () => {
	handleTitlesSection();
	const btnCloseProfile = document.querySelectorAll(".cerrar-sesion");

	btnCloseProfile.forEach((btn) => {
		btn.addEventListener("click", () => {
			saveDataInStorage("sesionIsOpen", false);
			window.location.href = "/index.html";
		});
	});

	handleFiltersSection();
	loginScreenLauncher();
	renderAnimal(animal);
	linksInteraction();
	openMobileNav();
});
