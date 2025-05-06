import { loginScreenLauncher } from "../components/login-screen.js";
import { screeningAnimals } from "../components/render-animals.js";
import { openMobileNav, linksInteraction } from "../helpers/buttons-nav.js";
import { getDataFromStorage, saveDataInStorage } from "../helpers/storage.js";

export let animals = [];

export const sendingAFetch = async (animal) => {
	let animalToFetch = animal ? animal : getDataFromStorage("animalFetch");
	try {
		const response = await fetch(`https://huachitos.cl/api/animales/tipo/${animalToFetch}`);
		if (!response.ok) {
			throw new Error("NEW ERROR");
		}
		const data = await response.json();
		const animales = data.data;
		const slicedAnimals = animales.slice(0, 20);
		animals = [];
		slicedAnimals.forEach((animal) => {
			animals.push(animal);
		});
	} catch (error) {
		console.log(error);
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
	const filteredAnimals = screeningAnimals(animals);
	filteredAnimals.forEach((animalFounded) => {
		console.log(animalFounded);
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
