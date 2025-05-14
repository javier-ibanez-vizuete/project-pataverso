import { getDataFromStorage } from "../helpers/storage.js";

const createAnimalInfoContainer = (animal) => {
	const infoContainer = document.createElement("div");
	infoContainer.classList.add("sponsored-animal-info-cotnainer");

	const name = document.createElement("h4");
	name.innerHTML = `NOMBRE: <span>${animal.nombre}</span>`;

    const genre = document.createElement("h4");
    genre.innerHTML = `SEXO: <span>${animal.genero}</span>`

    const age = document.createElement("h4");
    age.innerHTML = `EDAD: <span>${animal.edad}</span>`

    const type = document.createElement("h4");
    type.innerHTML = `TIPO DE MASCOTA: <span>${animal.tipo}</span>`

	infoContainer.append(name, genre, age, type);

	return infoContainer;
};

const createAnimalImage = (imagen) => {
	console.log("que vale imagen", imagen);
	const imageContainer = document.createElement("div");
	imageContainer.classList.add("sponsored-animal-image-container");
	const image = document.createElement("img");
	console.log(("que vale image", image));
	image.src = imagen;
	imageContainer.appendChild(image);

	return imageContainer;
};

const createAnimalCard = (animals) => {
	const cardsContainer = document.querySelector(".sponsored-animals-cards-container");
	if (!cardsContainer) {
		return;
	}
	cardsContainer.innerHTML = "";

	if (!animals.length) {
		cardsContainer.innerHTML = `
	        <h4 class="h4-no-pet-message">Actualmente no tienes ninguna mascota Apadrinada</h4>
        `;
	}
	animals.forEach((animal) => {
		const animalCard = document.createElement("div");
		animalCard.classList.add("sponsor-animal-card");

		const { imagen } = animal;
		const image = createAnimalImage(imagen);
		const info = createAnimalInfoContainer(animal);
		animalCard.append(image, info);
		cardsContainer.appendChild(animalCard);
	});
};

const renderSponsoredAnimals = () => {
	const currentUser = getDataFromStorage("currentUser");

	const users = getDataFromStorage("usersData");
	if (!currentUser) {
		console.log("no se encontro currentUser");
	}

	const userIndex = users.findIndex((user) => user.id === currentUser.id);
	if (userIndex === -1) {
		console.log("No se encontro userIndex");
	}

	const animals = users[userIndex].sponsoring;
	createAnimalCard(animals);
};

const sectionsAnimations = () => {
	const sponsoredSection = document.querySelector(".section-sponsored-animals");
	const userDetailsSection = document.querySelector(".section-user-details");

	sponsoredSection.addEventListener("click", () => {
		const arrowIcons = sponsoredSection.querySelectorAll(".icon-arrow-container");
		const sectionAnimalsCards = document.querySelector(".sponsored-animals-cards-container");
		if (arrowIcons.length) {
			arrowIcons.forEach((icon) => icon.classList.toggle("icon-arrow-container-opened"));
		}
		if (!sectionAnimalsCards) {
			console.log("No se encuentró sectionAnimalsCards");
			return;
		}
		sponsoredSection.classList.toggle("profile-section-opened");
		sectionAnimalsCards.classList.toggle("sponsored-animals-cards-container-opened");
	});

	userDetailsSection.addEventListener("click", () => {
		const arrowIcons = userDetailsSection.querySelectorAll(".icon-arrow-container");
		const sectionFormDetails = document.querySelector(".form-user-details");
		if (arrowIcons.length) {
			arrowIcons.forEach((icon) => icon.classList.toggle("icon-arrow-container-opened"));
		}
		if (!sectionFormDetails) {
			console.log("No se encontro sectionFormDetails");
			return;
		}
		userDetailsSection.classList.toggle("profile-section-opened");
		sectionFormDetails.classList.toggle("form-user-details-opened");
	});
};

document.addEventListener("DOMContentLoaded", () => {
	sectionsAnimations();
	renderSponsoredAnimals();

	const nombre = document.getElementById("nombre");
	nombre.textContent = getDataFromStorage("currentUser").nombre;
});
