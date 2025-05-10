import { loginScreenLauncher } from "../components/login_screen.js";
import { createAnimalCard, screeningAnimals } from "../components/render_animals.js";
import { ANIMALS_DATA_BACKUP } from "../helpers/animals_backup.js";
import { openMobileNav, linksInteraction } from "../helpers/buttons_nav.js";
import { getDataFromStorage, removeFromStorage, saveDataInStorage } from "../helpers/storage.js";

// export let animals = [];
export let ANIMALS_DATA_BASE = {
	perro: [],
	gato: [],
	conejo: [],
};
if (!getDataFromStorage("animalsData")) {
	saveDataInStorage("animalsData", ANIMALS_DATA_BASE);
}
if (getDataFromStorage("animalsData")) {
	ANIMALS_DATA_BASE = getDataFromStorage("animalsData");
}
let animalToFetch = getDataFromStorage("animalFetch");

export const sendingAFetch = async (animal) => {
	animalToFetch = animal ? animal : getDataFromStorage("animalFetch");
	try {
		if (!ANIMALS_DATA_BASE[animalToFetch].length) {
			const response = await fetch(`https://huachitos.cl/api/animales/tipo/${animalToFetch}`);
			if (!response.ok) {
				throw new Error("NEW ERROR");
			}
			const data = await response.json();
			const animales = data.data;
			animales.forEach((animal) => {
				ANIMALS_DATA_BASE[animalToFetch].push(animal);
			});
			saveDataInStorage("animalsData", ANIMALS_DATA_BASE);
		}
	} catch (error) {
		console.log(error);
		ANIMALS_DATA_BASE = ANIMALS_DATA_BACKUP;
	}
};

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
export const renderAnimal = async (animal) => {
	const pataAmigosContainer = document.querySelector(".pataamigos-cards-container");
	pataAmigosContainer.innerHTML = "";
	await sendingAFetch(animal);
	console.log(ANIMALS_DATA_BASE.conejo);
	const filteredAnimals = screeningAnimals(ANIMALS_DATA_BASE[animalToFetch]);
	filteredAnimals
		.sort((animalA, animalB) => animalB.id - animalA.id)
		.forEach((animalFounded) => {
			const animalCard = createAnimalCard(animalFounded);
			pataAmigosContainer.append(animalCard);
		});
};

const recalculateFilters = () => {
	const spanFiltersActivated = document.querySelector(".span-filters-counter");
	const filterElements = document.querySelectorAll(".filter-counter");
	let numberOFFilter = 0;

	filterElements.forEach((filter) => {
		if (filter.value !== "disabled") {
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
		renderAnimal(animal);
		containerFilters.classList.toggle("dont-show");
	});
};

const handleTitlesSection = async () => {
	const h1 = document.querySelector(".h1-animal-page");
	const currentAnimal = await getDataFromStorage("pataAnimalName");

	document.title = `Pataverso | ${currentAnimal.toUpperCase()}`;
	h1.textContent = `${currentAnimal.toUpperCase()}`;
};

document.addEventListener("DOMContentLoaded", () => {
	const btnCloseProfile = document.querySelectorAll(".cerrar-sesion");
	const btnApplyFilters = document.querySelector(".btn-apply-filters");

	btnCloseProfile.forEach((btn) => {
		btn.addEventListener("click", () => {
			removeFromStorage("currentUser");
			saveDataInStorage("sesionIsOpen", false);
			window.location.href = "/index.html";
		});
	});
	btnApplyFilters.addEventListener("click", (event) => {
		event.preventDefault();
		renderAnimal(animal);
	});

	handleTitlesSection();
	handleFiltersSection();
	loginScreenLauncher();
	renderAnimal(animal);
	linksInteraction();
	openMobileNav();
});
