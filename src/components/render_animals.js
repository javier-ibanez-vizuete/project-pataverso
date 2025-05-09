import { createAdoptModal } from "./adopt_modal.js";

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

const createExpandButtonsContainer = (animalName) => {
	const expandedCard = document.querySelector("#tarjeta-extendida");
	console.log("QUE ES EXPANDED CARD", expandedCard);
	const h1 = document.querySelector(".h1-animal-page");
	const filtersContainer = document.querySelector(".filters-mobile-section-container");
	const cardsContainer = document.querySelector(".pataamigos-cards-container");

	const divDetailsButtonsContainer = document.createElement("div");
	divDetailsButtonsContainer.classList.add("details-pet-btns-container");

	const adoptSponsorBtnsContainer = document.createElement("div");
	adoptSponsorBtnsContainer.classList.add("details-pet-btns-adopt-sponsor-container");

	const btnAdoptPet = document.createElement("button");
	btnAdoptPet.classList.add("btn-adopt-pet", "btn-style");
	btnAdoptPet.textContent = "ADOPTAR A";
	const spanAdoptPet = document.createElement("span");
	spanAdoptPet.classList.add("span-adopt-pet");
	spanAdoptPet.textContent = animalName.toUpperCase();
	btnAdoptPet.appendChild(spanAdoptPet);
	btnAdoptPet.addEventListener("click", () => {
		createAdoptModal(animalName);
	});

	const btnSponsorPet = document.createElement("button");
	btnSponsorPet.classList.add("btn-sponsor-pet", "btn-style");
	btnSponsorPet.textContent = "APADRINAR A";
	const spanSponsorPet = document.createElement("span");
	spanSponsorPet.classList.add("span-sponsor.pet");
	spanSponsorPet.textContent = animalName.toUpperCase();
	btnSponsorPet.appendChild(spanSponsorPet);
	btnSponsorPet.addEventListener("click", () => {
		alert(`
                    GRACIAS POR APADRINAR A ${animalName}
            En breve nos pondremos en contacto con usted
            a traves de su correo eléctronico para organizar
            los tramites del apadrinamiento.
        `);
	});

	adoptSponsorBtnsContainer.append(btnAdoptPet, btnSponsorPet);

	const btnGoToAnimals = document.createElement("button");
	btnGoToAnimals.classList.add("btn-go-back", "btn-style");
	btnGoToAnimals.textContent = "VOLVER ATRAS";
	btnGoToAnimals.addEventListener("click", () => {
		const expandedCard = document.querySelector("#tarjeta-extendida");

		console.log("QUE ES EXPANDED CARD", expandedCard);
		expandedCard.remove();
		h1.classList.remove("dont-show");
		filtersContainer.classList.remove("dont-show");
		cardsContainer.classList.remove("dont-show");
	});

	divDetailsButtonsContainer.append(adoptSponsorBtnsContainer, btnGoToAnimals);

	return divDetailsButtonsContainer;
};

const createExpandPetInformationContainer = (animal) => {
	const divExtendedInformationContainer = document.createElement("div");
	divExtendedInformationContainer.classList.add("details-pet-information-container");

	const pAgePet = document.createElement("p");
	pAgePet.classList.add("p-age-pataamigo");
	pAgePet.textContent = "EDAD:";
	const spanAgePet = document.createElement("span");
	spanAgePet.classList.add("span-age-pataamigo");
	spanAgePet.textContent = animal.edad ? animal.edad : "Desconocida";
	pAgePet.appendChild(spanAgePet);

	const pGenrePet = document.createElement("p");
	pGenrePet.classList.add("p-genre-pataamigo");
	pGenrePet.textContent = "SEXO:";
	const spanGenrePet = document.createElement("span");
	spanGenrePet.classList.add("span-genre-pataamigo");
	spanGenrePet.textContent = animal.genero;
	pGenrePet.appendChild(spanGenrePet);

	const pSterilPet = document.createElement("p");
	pSterilPet.classList.add("p-sterilized-pataamigo");
	pSterilPet.textContent = "ESTERILIZADO:";
	const spanSterilPet = document.createElement("span");
	spanSterilPet.classList.add("span-sterilized-pataamigo");
	spanSterilPet.textContent = animal.esterilizado ? "SI" : "NO";
	pSterilPet.appendChild(spanSterilPet);

	const pVaccinesPataamigo = document.createElement("p");
	pVaccinesPataamigo.classList.add("p-vaccines-pataamigo");
	pVaccinesPataamigo.textContent = "VACUNADO:";
	const spanVaccinesPataamigo = document.createElement("span");
	spanVaccinesPataamigo.classList.add("span-vaccines-pataamigo");
	spanVaccinesPataamigo.textContent = animal.vacunas ? "SI" : "NO";
	pVaccinesPataamigo.appendChild(spanVaccinesPataamigo);

	const cleanedDescription = animal.desc_fisica.split("<p>").join("").split("</p>").join("");
	const pDescriptionPataamigo = document.createElement("p");
	pDescriptionPataamigo.classList.add("p-description-pataamigo");
	pDescriptionPataamigo.textContent = "DESCRIPCION:";
	const spanDescriptionPataamigo = document.createElement("span");
	spanDescriptionPataamigo.classList.add("span-description-pataamigo");
	spanDescriptionPataamigo.textContent = cleanedDescription ? cleanedDescription : "Increiblemente Hermoso";
	pDescriptionPataamigo.appendChild(spanDescriptionPataamigo);

	const cleanedPersonality = animal.desc_personalidad.split("<p>").join("").split("</p>").join("");
	const pPersonalityPataamigo = document.createElement("p");
	pPersonalityPataamigo.classList.add("p-personality-pataamigo");
	pPersonalityPataamigo.textContent = "PERSONALIDAD:";
	const spanPersonalityPataamigo = document.createElement("span");
	spanPersonalityPataamigo.classList.add("span-personality-pataamigo");
	spanPersonalityPataamigo.textContent = cleanedPersonality ? cleanedPersonality : "Por descubrir";
	pPersonalityPataamigo.appendChild(spanPersonalityPataamigo);

	const cleanedAdvice = animal.desc_adicional.replaceAll("<p>", "").replaceAll("</p>", "");
	console.log("CLEANED ADVICE ", cleanedAdvice);
	const pAdvicePataamigo = document.createElement("p");
	pAdvicePataamigo.classList.add("p-advice-pataamigo");
	pAdvicePataamigo.textContent = "INFORMACION ADICIONAL:";
	const spanAdvicePataamigo = document.createElement("span");
	spanAdvicePataamigo.classList.add("span-advice-pataamigo");
	spanAdvicePataamigo.textContent = cleanedAdvice ? cleanedAdvice : "Darle muchisimo amor";
	pAdvicePataamigo.appendChild(spanAdvicePataamigo)

	const { nombre } = animal;
	const expandButtonsContainer = createExpandButtonsContainer(nombre);

	divExtendedInformationContainer.append(
		pAgePet,
		pGenrePet,
		pSterilPet,
		pVaccinesPataamigo,
		pDescriptionPataamigo,
		pPersonalityPataamigo,
		pAdvicePataamigo,
		expandButtonsContainer
	);

	return divExtendedInformationContainer;
};

const createExpandPetCard = (animal) => {
	const expandCardContainer = document.createElement("section");
	expandCardContainer.classList.add("expand-pet-container");
	expandCardContainer.id = "tarjeta-extendida";

	const h2PetName = document.createElement("h2");
	h2PetName.classList.add("h2-pet-title");
	h2PetName.textContent = animal.nombre.toUpperCase();

	const { imagen } = animal;
	const expandImageContainer = createImageContainer(imagen);
	// expandImageContainer.classList.add("details-pet-image-container");

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
	btnForMore.classList.add("btn-style");
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
