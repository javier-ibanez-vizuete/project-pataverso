import { loginScreenLauncher } from "../components/login_screen.js";
import { createAnimalCard, screeningAnimals } from "../components/render_animals.js";
import { ANIMALS_DATA_BACKUP } from "../helpers/animals_backUp.js";
import { openMobileNav, linksInteraction } from "../helpers/buttons_nav.js";
import { getDataFromStorage, removeFromStorage, saveDataInStorage } from "../helpers/storage.js";
import { floatingButton } from "../utils/floating_button.js";

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

/**
 * Fetches and caches animal data for a given type if not already loaded.
 * 
 * This asynchronous function determines the target animal type (from the
 * provided parameter or local storage), checks the in-memory cache
 * ('ANIMALS_DATA_BASE'), and if empty, performs a network request to
 * retrieve the data. On success, it populates the cache and persists it
 * to local storage. On failure, it logs the error and restores the backup data.
 * 
 * @function sendingAFetch
 * @param {string} animal - The animal type to fetch (perro, gato, conejo).
 *    If omitted, retrieves the type from local storage key "animalFetch".
 * @returns {Promise} A promise that resolves once fetching and catching are complete.
 */
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

/**
 * Fetches, filters, sort, and renders pet cards for a given animal type.
 *
 * This asynchronous function:
 *   1. Clears the current list of rendered pet cards.
 *   2. Sends a fetch request to load data for the specified animal type.
 *   3. Applies the screening filters to the loaded data.
 *   4. Sorts the filtered animals by descending ID.
 *   5. Creates and appends a card for each resulting animal.
 *
 * @function renderAnimal
 * @param {string} animal - The key identifying which animal dataset to render (perro, gato, conejo).
 * @returns {Promise} A promise that resolves once all pet cards have been rendered.
 */
export const renderAnimal = async (animal) => {
	const pataAmigosContainer = document.querySelector(".pataamigos-cards-container");
	pataAmigosContainer.innerHTML = "";
	await sendingAFetch(animal);
	const filteredAnimals = screeningAnimals(ANIMALS_DATA_BASE[animalToFetch]);
	filteredAnimals
		.sort((animalA, animalB) => animalB.id - animalA.id)
		.forEach((animalFounded) => {
			const animalCard = createAnimalCard(animalFounded);
			pataAmigosContainer.append(animalCard);
		});
};

/**
 * Updates the visible count of active filters.
 *
 * This function selects all filter inputs with the class '.filter-counter',
 * counts how many have a value other than '"disabled"', and sets that number
 * as the text content of the '.span-filters-counter' element.
 *
 * @function recalculateFilters
 */
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

/**
 * Attaches event listeners to control the filter UI and actions.
 *
 * This function sets up:
 *   - A toggle button to show or hide the filter container.
 *   - A listener on the filter form to recalculate displayed animals when any filter changes.
 *   - A reset button to clear all filters, recalculate, re-render the current animal list, and hide the filters.
 *
 * @function handleFiltersSection
 */
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

/**
 * Updates the page title and the H1 heading to reflect the currently selected animal.
 *
 * This asynchronous function retrieves the stored animal name from local storage,
 * converts it to uppercase, and applies it both to the document's title and to
 * the text content of the H1 element with class 'h1-animal-page'.
 *
 * @function handleTitlesSection
 * @returns {Promise} A promise that resolves once the title and heading have benn update.
 */
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

	floatingButton();
	handleTitlesSection();
	handleFiltersSection();
	loginScreenLauncher();
	renderAnimal(animal);
	linksInteraction();
	openMobileNav();
});
