export const screeningAnimals = (animals) => {
	const filterForm = document.querySelector(".filters-mobile-section-container");
	const genreFilter = document.querySelector("#genre-filter-select");
	const vaccinatedFilter = document.querySelector("#vaccinated-filter-select");
	const sterilizedFilter = document.querySelector("#sterilized-filter-select");
	let filteredAnimals = animals;

	if (genreFilter.value !== "disabled") {
		filteredAnimals = filteredAnimals.filter((animal) => animal.genero === genreFilter.value);
	}
	if (vaccinatedFilter.value !== "disabled") {
		filteredAnimals = filteredAnimals.filter((animal) => animal.vacunas === Number(vaccinatedFilter.value));
	}

	if (sterilizedFilter.value !== "disabled") {
		filteredAnimals = filteredAnimals.filter((animal) => animal.esterilizado === Number(sterilizedFilter.value));
	}

	if (!filteredAnimals.length) {
		alert("NO HAY ANIMALES QUE SE AJUSTEN A SUS FILTROS");
		filterForm.reset();
		return animals;
	}

	return filteredAnimals;
};
