import { getDataFromStorage } from "./storage.js";

export const petsCounter = () => {
	const counterdisplay = document.querySelector(".span-counter-pet-display");
	const animals = getDataFromStorage("animalsData");

    if (!counterdisplay) {
        return;
    }

	if (!animals) {
		console.error("No se encontro animals en LocalStorage");
		return;
	}

	const { conejo, perro, gato } = animals;

	console.log("que vale conejo", conejo);

	const numberOfAnimals = conejo.length + perro.length + gato.length;

	counterdisplay.textContent = numberOfAnimals;
};
