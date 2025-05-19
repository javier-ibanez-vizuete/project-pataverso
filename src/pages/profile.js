import { getDataFromStorage, removeFromStorage, saveDataInStorage } from "../helpers/storage.js";

const createAnimalInfoContainer = (animal) => {
	const infoContainer = document.createElement("div");
	infoContainer.classList.add("sponsored-animal-info-cotnainer");

	const name = document.createElement("h4");
	name.innerHTML = `NOMBRE: <span>${animal.nombre}</span>`;

	const genre = document.createElement("h4");
	genre.innerHTML = `SEXO: <span>${animal.genero}</span>`;

	const age = document.createElement("h4");
	age.innerHTML = `EDAD: <span>${animal.edad}</span>`;

	const type = document.createElement("h4");
	type.innerHTML = `TIPO DE MASCOTA: <span>${animal.tipo}</span>`;

	infoContainer.append(name, genre, age, type);

	return infoContainer;
};

const createAnimalImage = (imagen) => {
	const imageContainer = document.createElement("div");
	imageContainer.classList.add("sponsored-animal-image-container");
	const image = document.createElement("img");
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

	const sponsoredSectionTitle = document.querySelector(".sponsored-animal-title");
	const userDetailsTitle = document.querySelector(".user-details-title");

	sponsoredSectionTitle.addEventListener("click", () => {
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

	userDetailsTitle.addEventListener("click", () => {
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

const handleUserDetailsForm = () => {
	const users = getDataFromStorage("usersData");
	if (!users.length) {
		console.error("No se encontraron usuarios");
		return;
	}
	const currentUser = getDataFromStorage("currentUser");
	if (!currentUser) {
		console.error("No se encontro usuario activo");
		return;
	}
	const userIndex = users.findIndex((user) => user.id === currentUser.id);
	if (userIndex === -1) {
		console.error("No se encontro userIndex");
		return;
	}

	const formUserDetails = document.querySelector(".form-user-details");
	if (!formUserDetails) {
		console.error("No se encontro el boton");
		return;
	}

	const user = users[userIndex];

	const spanOldName = document.querySelector(".span-old-name");
	if (!spanOldName) {
		console.error("No se encontro el span del nombre actual");
		return;
	}
	spanOldName.textContent = `(Actual: ${user.nombre})`;

	const spanOldEmail = document.querySelector(".span-old-email");
	if (!spanOldEmail) {
		console.error("No se encontró el span del nombre actual");
		return;
	}
	spanOldEmail.textContent = `(Actual: ${user.email})`;

	formUserDetails.addEventListener("submit", (event) => {
		event.preventDefault();

		const form = document.querySelector(".form-user-details");
		const newName = document.querySelector("#input-change-user-name");
		const newEmail = document.querySelector("#input-change-user-email");
		const oldPass = document.querySelector("#input-old-user-password");
		const newPass = document.querySelector("#input-change-user-password");
		const nombreDogHouse = document.getElementById("nombre-dog-house");

		if (!oldPass.value) {
			return;
		}
		if (oldPass.value !== user.password) {
			alert("La antigua contraseña no es correcta");
			form.reset();
			return;
		}

		if (newName.value) {
			user.nombre = newName.value;
		}
		if (newEmail.value) {
			user.email = newEmail.value;
		}
		if (newPass.value) {
			user.password = newPass.value;
		}

		saveDataInStorage("currentUser", user);
		saveDataInStorage("usersData", users);
		form.reset();
		spanOldName.textContent = `(Actual: ${user.nombre})`;
		spanOldEmail.textContent = `(Actual: ${user.email})`;
		nombreDogHouse.textContent = getDataFromStorage("currentUser").nombre;

		console.log("Usuario despues de cambios", user);
		console.log("Users after changes", users);
	});
};

const handleUserSesion = () => {
	const sesionOpen = getDataFromStorage("sesionIsOpen");
	const btnLogOut = document.querySelector(".house-dog-container-toloco");
	const currentUser = getDataFromStorage("currentUser");

	console.log("Que vale sesion is open", sesionOpen);

	if (!sesionOpen) {
		window.location.href = "/index.html";
		return;
	}
	if (!btnLogOut) {
		console.error("No se encontro el boton de logout");
		return;
	}
	if (!currentUser) {
		console.error("No se encontro usuario Activo");
		return;
	}

	btnLogOut.addEventListener("click", () => {
		saveDataInStorage("sesionIsOpen", false);
		removeFromStorage("currentUser");
		window.location.reload();
	});
};

document.addEventListener("DOMContentLoaded", () => {
	handleUserSesion();
	const nombreDogHouse = document.getElementById("nombre-dog-house");

	if (!nombreDogHouse) {
		console.error("No se encontro el nombreDogHouse");
		return;
	}
	const currentUser = getDataFromStorage("currentUser");
	if (currentUser) {
		nombreDogHouse.textContent = getDataFromStorage("currentUser").nombre;
	}

	sectionsAnimations();
	renderSponsoredAnimals();
	handleUserDetailsForm();
});
