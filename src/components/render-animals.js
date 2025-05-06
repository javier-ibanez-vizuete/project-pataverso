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

const createExpandPetInformationContainer = (animal) => {
    const divExtendedInformationContainer = document.createElement("div");

    return divExtendedInformationContainer;
};

const createExpandPetCard = (animal) => {
    const expandCardContainer = document.createElement("section");
    expandCardContainer.classList.add("expand-pet-container");

    const h2PetName = document.createElement("h2");
    h2PetName.classList.add("h2-pet-title");
    h2PetName.textContent = animal.nombre.toUpperCase();

    const {imagen} = animal;
    const expandImageContainer = createImageContainer(imagen);
    expandImageContainer.classList.add("details-pet-image-container");

    const expandPetInformationContainer = createExpandPetInformationContainer(animal);

    expandCardContainer.append(h2PetName, expandImageContainer, expandPetInformationContainer);
    
    return expandCardContainer;
};

const createButtonContainer = (animal) => {
    const mainContainer = document.querySelector(".main-container");
    const h1 = document.querySelector(".h1-animal-page");
    const filtersContainer = document.querySelector(".filters-mobile-section-container");
    const cardsContainer = document.querySelector(".pataamigos-cards-container");
	const divBtnContainer = document.createElement("div");
	divBtnContainer.classList.add("div-button-container");

	const btnForMore = document.createElement("button");
	btnForMore.classList.add("btn-know-pet");
	btnForMore.textContent = "CONOCEME";
	btnForMore.addEventListener("click", () => {

		h1.classList.add("dont-show");
		filtersContainer.classList.add("dont-show");
		cardsContainer.classList.add("dont-show");

        const petDetailsCard = createExpandPetCard(animal);
        mainContainer.append(petDetailsCard);
	});

    divBtnContainer.append(btnForMore);

	return divBtnContainer;
};

const createPetGenreContainer = (genre) => {
	const divGenreContainer = document.createElement("div");
	divGenreContainer.classList.add("genre-pet-container");

	const spanPetGenre = document.createElement("span");
	spanPetGenre.textContent = "SEXO:";

	const petGenre = document.createElement("h5");
	petGenre.textContent = genre.toUpperCase();

	divGenreContainer.append(spanPetGenre, petGenre);

	return divGenreContainer;
};

const createPetNameContainer = (name) => {
	const divNameContainer = document.createElement("div");
	divNameContainer.classList.add("name-pet-container");

	const spanPetName = document.createElement("span");
	spanPetName.textContent = "NOMBRE:";

	const petName = document.createElement("h5");
	petName.textContent = name.toUpperCase();

	divNameContainer.append(spanPetName, petName);

	return divNameContainer;
};

const createInformationContainer = (animal) => {
	const divInformationContainer = document.createElement("div");
	divInformationContainer.classList.add("information-pet-container");

	const { nombre } = animal;
	const nameContainer = createPetNameContainer(nombre);

	const { genero } = animal;
	const genreContainer = createPetGenreContainer(genero);

	const btnContainer = createButtonContainer(animal);

    divInformationContainer.append(nameContainer, genreContainer, btnContainer);

	return divInformationContainer;
};

const createImageContainer = (image) => {
	const divImageContainer = document.createElement("div");
	divImageContainer.classList.add("image-pet-container");

	const petImage = document.createElement("img");
	petImage.src = image;

	divImageContainer.append(petImage);

	return divImageContainer;
};

export const createAnimalCard = (animal) => {
	const animalCard = document.createElement("article");
	animalCard.classList.add("card-pet-container");

	const { imagen } = animal;
	const imageContainer = createImageContainer(imagen);

	const informationContainer = createInformationContainer(animal);

	animalCard.append(imageContainer, informationContainer);
	console.log(animal);

	return animalCard;
};
