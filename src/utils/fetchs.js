import { animals } from "../pages/animals.js";

export const sendingAFetch = async (animal) => {
	try {
		const response = await fetch(`https://huachitos.cl/api/animales/tipo/${animal}`);
		if (!response.ok) {
			throw new Error("NEW ERROR");
		}
		const data = await response.json();
		const animales = data.data;
		const slicedAnimals = animales.slice(0, 20);
		slicedAnimals.forEach((animal) => {
			animals.push(animal);
		});
	} catch (error) {
		console.log(error);
	}
};