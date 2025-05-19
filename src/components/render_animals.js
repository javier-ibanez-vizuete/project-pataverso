import { getDataFromStorage, removeFromStorage, saveDataInStorage } from "../helpers/storage.js";
import { createAdoptModal } from "./adopt_modal.js";
import { createSponsorModal } from "./sponsor_modal.js";

/**
 * Filters a list of animals based on selected criteria: genre, vaccination, and sterilization.
 * 
 * This function retrieves filter values from the DOM, applioes each active filter
 * sequentially, and returns the subset of animals matching all selected criteria.
 * If no animals match, it alerts the user, reset the filter form, adn returns the original list.
 * 
 * @function screeningAnimals
 * @param {Array} animals - The array of animal objects to filter.
 * @param {string} animals[].genero - The genre of the animal.
 * @param {number} animals[].vacunas - Vaccination status (1 for vaccinated, 0 for not).
 * @param {number} animals[].esterilizado - Sterilization status (1 for sterilized, 0 for not).
 * @returns {Array} The filtered array of animals, or the original array if no matches.
 */
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

/**
 * Create a container with action buttons for adopting, sponsoring, and returning to the pet list.
 * 
 * This function builds a button panel that includes:
 *  - An 'Adopt' button which opens the adoption modal for the given animal.
 *  - A 'Sponsor' button which opens the sponsorship modal for the given animal.
 *  - A 'Back' button which closes the expanded view and scrolls the original pet card into view.
 * It also handles showing and hidding relevant page sections.
 * 
 * @function createExpandButtonsContainer
 * @param {Object} animal - The data object representing the pet.
 * @param {string} animal.nombre - The pet's name (used in button labels).
 * @returns {HTMLElement} A <div> element containing the action buttons.
 */
const createExpandButtonsContainer = (animal) => {
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
	spanAdoptPet.textContent = animal.nombre.toUpperCase();
	btnAdoptPet.appendChild(spanAdoptPet);
	btnAdoptPet.addEventListener("click", () => {
		createAdoptModal(animal);
	});

	const btnSponsorPet = document.createElement("button");
	btnSponsorPet.classList.add("btn-sponsor-pet", "btn-style");
	btnSponsorPet.textContent = "APADRINAR A";
	const spanSponsorPet = document.createElement("span");
	spanSponsorPet.classList.add("span-sponsor.pet");
	spanSponsorPet.textContent = animal.nombre.toUpperCase();
	btnSponsorPet.appendChild(spanSponsorPet);
	btnSponsorPet.addEventListener("click", () => {
		createSponsorModal(animal);
	});

	adoptSponsorBtnsContainer.append(btnAdoptPet, btnSponsorPet);

	const btnGoToAnimals = document.createElement("button");
	btnGoToAnimals.classList.add("btn-go-back", "btn-style");
	btnGoToAnimals.textContent = "VOLVER ATRAS";
	btnGoToAnimals.addEventListener("click", () => {
		const expandedCard = document.querySelector("#tarjeta-extendida");
		const normalPetCardName = document.querySelectorAll(".title-pet-card");
		const petInView = getDataFromStorage("animalInView");
		expandedCard.remove();
		console.log(normalPetCardName);
		h1.classList.remove("dont-show");
		filtersContainer.classList.remove("dont-show");
		cardsContainer.classList.remove("dont-show");

		normalPetCardName.forEach((petName) => {
			console.log("petName", petName.textContent);
			if (petName.textContent.toLowerCase() === petInView.toLowerCase()) {
				petName.scrollIntoView({ behavior: "smooth", block: "center" });
				removeFromStorage("animalInView");
			}
		});
	});

	divDetailsButtonsContainer.append(adoptSponsorBtnsContainer, btnGoToAnimals);

	return divDetailsButtonsContainer;
};

/**
 * Creates a DOM element containing detailed information about pet.
 *
 * This function builds a container with structured paragraphs and spans to display
 * the pet's age, genre, sterilization status, vaccination status, physical description,
 * personality traits, and additional notes. It also appends a button container for
 * interactive actions using a helper function.
 *
 * @function createExpandPetInformationContainer
 * @param {Object} animal - The animal data used to populate the container.
 * @param {string} animal.edad - The pet's age.
 * @param {string} animal.genero - The pet's genre.
 * @param {boolean} animal.esterilizado - Whether the pet is sterilized.
 * @param {boolean} animal.vacunas - Whether the pet is vaccinated.
 * @param {string} animal.desc_fisica - Physical description in HTML string format.
 * @param {string} animal.desc_personalidad - Personality description in HTML string format.
 * @param {string} animal.desc_adicional - Additional advice or notes in HTML string format.
 * @returns {HTMLElement} The DOM element containing all structured pet information.
 */
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
	const pAdvicePataamigo = document.createElement("p");
	pAdvicePataamigo.classList.add("p-advice-pataamigo");
	pAdvicePataamigo.textContent = "INFORMACION ADICIONAL:";
	const spanAdvicePataamigo = document.createElement("span");
	spanAdvicePataamigo.classList.add("span-advice-pataamigo");
	spanAdvicePataamigo.textContent = cleanedAdvice ? cleanedAdvice : "Darle muchisimo amor";
	pAdvicePataamigo.appendChild(spanAdvicePataamigo);

	const expandButtonsContainer = createExpandButtonsContainer(animal);

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

/**
 * Creates a detailed (expanded) pet card DOM element based on the given animal data.
 *
 * This function builds a structure HTML section containing the pet's name,
 * image, and detailed information. It uses helper functions to generate the image container and the pet information section.
 *
 * @function createExpandPetCard
 * @param {Object} animal - The animal data used to populate the card.
 * @param {string} animal.nombre - The name of the animal.
 * @param {string} animal.imagen - The URL or path to the animal's image.
 * @returns {HTMLElement} The complete DOM element representing the expanded pet card.
 */
const createExpandPetCard = (animal) => {
	const expandCardContainer = document.createElement("section");
	expandCardContainer.classList.add("expand-pet-container");
	expandCardContainer.id = "tarjeta-extendida";

	const h2PetName = document.createElement("h2");
	h2PetName.classList.add("h2-pet-title");
	h2PetName.textContent = animal.nombre.toUpperCase();

	const { imagen } = animal;
	const expandImageContainer = createImageContainer(imagen);
	expandImageContainer.classList.add("details-pet-image-container");

	const expandPetInformationContainer = createExpandPetInformationContainer(animal);

	expandCardContainer.append(h2PetName, expandImageContainer, expandPetInformationContainer);

	return expandCardContainer;
};

/**
 * Creates a button contianer for interacting with an animal card.
 *
 * This function builds a <div> element containing a 'Know Me' button that:
 *   1. Hides the main animal listing elements (title, filters, cards).
 *   2. Stores the selected animal in local storage under 'animaInView'.
 *   3. Appends an expanded pet details card to the main container.
 *   4. Scrolls the expanded image into view smoothly.
 *
 * @function createButtonContainer
 * @param {Object} animal - The animal object containing its details.
 * @param {string} animal.nombre - The name of the animal.
 * @returns {HTMLElement} A <div> element containing the action button for the animal card.
 */
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

		saveDataInStorage("animalInView", animal.nombre.toLowerCase());
		const petDetailsCard = createExpandPetCard(animal);
		mainContainer.append(petDetailsCard);
		const petImage = document.querySelector(".details-pet-image-container");
		petImage.scrollIntoView({ behavior: "smooth", block: "center" });
	});

	divBtnContainer.append(btnForMore);

	return divBtnContainer;
};

/**
 * Creates a container element displaying the pet's genre (sex).
 *
 * This function generates a <div> with a CSS class for styling, containing:
 *   - A <span> label 'SEXO:' (sex).
 *   - An <h5> element with the pet's genre in uppercase.
 *
 * @function createPetGenreContainer
 * @param {string} genre - The pet's genre/sex.
 * @returns {HTMLElement} A <div> element containing the labeled pet genre, ready for DOM insertion.
 */
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

/**
 * Creates a container element displaying the pet's name.
 *
 * This function generates a <div> with a CSS class for styling, containing:
 *   - A <span> label 'NOMBRE:' (name).
 *   - An <h5> element with the pet's name in uppercase.
 *
 * @function createPetNameContainer
 * @param {string} name - The pet's name.
 * @returns {HTMLElement} A <div> element containing the labeled pet name, ready for DOM insertion.
 */
const createPetNameContainer = (name) => {
	const divNameContainer = document.createElement("div");
	divNameContainer.classList.add("name-pet-container");

	const spanPetName = document.createElement("span");
	spanPetName.textContent = "NOMBRE:";

	const petName = document.createElement("h5");
	petName.classList.add("title-pet-card");
	petName.textContent = name.toUpperCase();

	divNameContainer.append(spanPetName, petName);

	return divNameContainer;
};

/**
 * Creates a container element with an animal's information (name, genre, and action button).
 *
 * This function generates a <div> with a specified CSS class appends:
 *   - A name container built by 'createPetNameContainer'.
 *   - A genre container built by 'createPetGenreContainer'.
 *   - A button container built by 'createButtonContianer'.
 *
 * @function createInformationContainer
 * @param {Object} animal - The animal object containing its details.
 * @param {string} animal.nombre - The animal's name.
 * @param {string} animal.genero - The animal's genre.
 * @returns {HTMLElement} A <div> element containing the animal's information, ready for DOM insertion.
 */
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

/**
 * Creates a container element for an animal image.
 *
 * This function generates a <div> with specified CSS class and appends
 * an <img> element with the provided image source.
 *
 * @function createImageContainer
 * @param {string} image - The URL or path of the animal image.
 * @returns {HTMLElement} A <div> element containing the image, ready for DOM insertion.
 */
const createImageContainer = (image) => {
	const divImageContainer = document.createElement("div");
	divImageContainer.classList.add("image-pet-container");

	const petImage = document.createElement("img");
	petImage.src = image;

	divImageContainer.append(petImage);

	return divImageContainer;
};

/**
 * Creates a visual card element for an animal with its image and information.
 *
 * This function generates an <article> HTML element containing:
 *   - An image container with the animal's image.
 *   - An information container with the animal's details.
 *
 * Both parts are built using helper funtions: 'createImageContainer' and 'createInformationContainer'.
 *
 * @function createAnimalCard
 * @param {Object} animal - Object representing an animal.
 * @param {string} animal.imagen - The image path or URL of the animal.
 * @returns {HTMLElement} An <article> element ready to be appended to the DOM.
 */
export const createAnimalCard = (animal) => {
	const animalCard = document.createElement("article");
	animalCard.classList.add("card-pet-container");

	const { imagen } = animal;
	const imageContainer = createImageContainer(imagen);

	const informationContainer = createInformationContainer(animal);

	animalCard.append(imageContainer, informationContainer);

	return animalCard;
};
