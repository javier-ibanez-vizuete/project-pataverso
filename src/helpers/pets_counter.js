import { getDataFromStorage } from "./storage.js";

/**
 * @description
 * Retrieves the array of animals from localStorage and updates a DOM element
 * with the total count of all pets (Dogs, Cats, and Rabbits). If the display
 * element or stored data is missing, logs an error or aborts silently.
 * 
 * @function petsCounter
 * @param {void}
 * @returns {void}
 */
export const petsCounter = async () => {
	const counterdisplay = document.querySelector(".span-counter-pet-display");
	const animals = await getDataFromStorage("animalsData");

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
