import { handleAlertOnForm } from "../helpers/alerts.js";
import { linksInteraction, logoutprofile, openMobileNav } from "../helpers/buttons_nav.js";
import { getDataFromStorage, saveDataInStorage } from "../helpers/storage.js";
import { floatingButton } from "../utils/floating_button.js";
import { handleUserSesion } from "../utils/handle_login.js";
import { imageFixer } from "../utils/image_fixer.js";

/**
 * @description
 * Renders the list of products purchased by the current user.
 * If no purchases are found, displays a message and a link to the store.
 *
 * @function renderProductsBought
 * @returns {void}
 */
const renderProductsBought = () => {
	const users = getDataFromStorage("usersData");
	const currentUser = getDataFromStorage("currentUser");
	if (!users.length) {
		console.error("No se encontro usersData en localStorage");
		return;
	}
	if (!currentUser) {
		console.error("No se encontro currentUser en localStorage");
		return;
	}
	const userIndex = users.findIndex((user) => user.id === currentUser.id);
	if (userIndex === -1) {
		console.error("No se ha encontrado el indice de user por ID");
		return;
	}
	const user = users[userIndex];
	const products = user.products_bought;
	const productsContainer = document.querySelector(".products-bought-container");
	if (!productsContainer) {
		console.error("No hemos encontrado la clase '.products-bought-container'");
		return;
	}
	productsContainer.innerHTML = "";
	if (!products.length) {
		productsContainer.innerHTML = `
		<h4 class="no-products-title">Aun no ha comprado ningun producto</h4>
		<a href="/pages/merchandising.html" class="no-products-link">TIENDA</a>
		`;
	}
	products.forEach((product) => {
		const productCard = document.createElement("div");
		productCard.classList.add("product-bought-card");
		productCard.innerHTML = `
		<div class="product-bought-image-container">
			<img src="${product.imagen}" loading="lazy" />
		</div>
		<div class="product-bought-info-container">
			<h4>${product.nombre}</h4>
			<h5>PRECIO: <span class="span-product-bought-price">${product.precio}€</span></h5>
			<h5>CANTIDAD COMPRADA: <span class="span-product-bought-quantity">${product.quantity}</span></h5>
			<h5>TOTAL APORTADO: <span class="span-product-bought-contributed">${product.quantity * product.precio}€</span></h5>
		</div>
		`;
		productsContainer.appendChild(productCard);
	});
};

/**
 * Creates and returns a DOM element that displays detailed information
 * about a fiven animal, including name, genre, age, and type.
 *
 * @function createAnimalInfoContainer
 * @param {Object} animal - The animal object containing its information.
 * @param {string} animal.nombre - The name of the animal.
 * @param {string} animal.genero - The genre of the animal (macho, hembra).
 * @param {string} animal.edad - The age of the animal.
 * @param {string} animal.tipo - The type of pet (perro, gato, conejo).
 * @returns {HTMLDivElement} A <div> element containing the formatted animal information.
 */
const createAnimalInfoContainer = (animal) => {
	const infoContainer = document.createElement("div");
	infoContainer.classList.add("sponsored-animal-info-container");

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

/**
 * Creates a DOM element wrapping an image for a sponsored animal.
 *
 * This function builds a '<div>' container with the class
 * 'sponsored-animal-image-container', creates an '<img>' element
 * using the provided image URL, appends the image to the container,
 * and returns the container element.
 *
 * @function createAnimalImage
 * @param {string} imagen - The URL of the animal's image.
 * @returns {HTMLElement} a <div> element containing the image.
 */
const createAnimalImage = (imagen) => {
	const imageContainer = document.createElement("div");
	imageContainer.classList.add("sponsored-animal-image-container");
	const image = document.createElement("img");
	image.setAttribute("loading", "lazy");
	image.src = imagen;
	imageContainer.appendChild(image);

	return imageContainer;
};

/**
 * Generates and renders sponsor animal cards within the sponsored animals container.
 *
 * This function:
 *  1. Selects the '.sponsored-animals-cards-container' element (if not found, return).
 *  2. Clears any existing content in the container.
 *  3. If the provided 'animals' array is empty, displays a message indicating no sponsored pets.
 *  4. Otherwise, iterates over each animal, creates a card with its image and info,
 *     and appends it to the container.
 *
 * @function createAnimalCard
 * @param {Array} animals - An array of animal objects to render as cards.
 * @param {string} animals[].imagen - The URL of the animal's image.
 */
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

/**
 * Render the list of animals the current user is sponsoring.
 *
 * This function:
 *  1. Retrieves the current user and all users from local storage.
 *  2. Finds the index of the current user.
 *  3. Retrieves the array of sponsored animals for the user.
 *  4. Calls 'createAnimalCard' for each sponsored animal to display its card.
 *
 * Logs a message if the current user or their sponsorship array cannot be found.
 *
 * @function renderSponsoredAnimals
 */
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

/**
 * Sets up click handlers to toggle the display and icon state of profile sections.
 *
 * This function binds click listener to:
 *  1. The 'Sponsored Animals' section title - toggles its expansion, arrow icon rotation,
 *     and the visibility of the sponsored animals cards container.
 *  2. The 'User Details' section title - toggles its expansion, arrow icon rotation,
 *     and the visibility of the user details form.
 *
 * It ensures that if the target container or icons are not found, it logs a console waring
 * and safely exists without throwing an error.
 *
 * @function sectionsAnimations
 */
const sectionsAnimations = () => {
	const sponsoredSection = document.querySelector(".section-sponsored-animals");
	const userDetailsSection = document.querySelector(".section-user-details");
	const donationSection = document.querySelector(".section-charitable-donation");
	const productsSection = document.querySelector(".section-products-bought");

	const sponsoredSectionTitle = document.querySelector(".sponsored-animal-title");
	const userDetailsTitle = document.querySelector(".user-details-title");
	const donationTitle = document.querySelector(".charitable-donation-title");
	const productsTitle = document.querySelector(".products-bought-title");

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

	donationTitle.addEventListener("click", () => {
		const arrowIcons = donationSection.querySelectorAll(".icon-arrow-container");
		const donationContainer = document.querySelector(".container-charitable-donation");
		if (arrowIcons.length) {
			arrowIcons.forEach((icon) => icon.classList.toggle("icon-arrow-container-opened"));
		}
		if (!donationContainer) {
			console.error("No se encontró Donation Container");
			return;
		}
		donationSection.classList.toggle("profile-section-opened");
		donationContainer.classList.toggle("container-charitable-donation-opened");
	});

	productsTitle.addEventListener("click", () => {
		const arrowIcons = productsSection.querySelectorAll(".icon-arrow-container");
		const productsContainer = document.querySelector(".products-bought-container");

		if (arrowIcons.length) {
			arrowIcons.forEach((icon) => icon.classList.toggle("icon-arrow-container-opened"));
		}
		if (!productsContainer) {
			console.error("No hemos encontrado '.products-bought-container'");
			return;
		}
		productsSection.classList.toggle("profile-section-opened");
		productsContainer.classList.toggle("products-bought-container-opened");
	});
};

/**
 * Initializes and handles the user details update form.
 *
 * This function:
 *  1. Loads users and the current user from local storage, validating their existence.
 *  2. Finds the current user's index and populates span elements with their existing name and email.
 *  3. Attaches a submit listener to the details form that:
 *    - Verifies the old password matches.
 *    - Updates name, email, and/or password if new values are provided.
 *    - Persists changes to local storage.
 *    - Updates the displayed current user name in the UI.
 *
 * @function handleUserDetailsForm
 */
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
			console.log("ENTRANDO EN EL IF");
			handleAlertOnForm("La antigua contraseña no es correcta");
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

/**
 * @description
 * Updates the on-page donation counter to reflect the total amount donated by the user.
 *
 * @function recalculateDonations
 * @param {Object} user            - The user object.
 * @param {number} user.donated    - The total amount the user has donated.
 * @returns {void}
 */
const recalculateDonations = (user) => {
	const spanForDonations = document.querySelector(".span-donation-counter");
	if (!spanForDonations) {
		console.error("No se encontró .span-donation-counter");
		return;
	}
	spanForDonations.textContent = user.donated;
};

/**
 * @description
 * Creates and displays a thank-you modal when a user completes a donation.
 *
 * @function donationThanksModal
 * @param {number} amount      - The amount of money donated.
 * @param {Object} user        - The user object representing the donor.
 * @param {string} user.nombre - The name of the user, used to personalize the message.
 * @returns {void}
 */
const donationThanksModal = (quantity, user) => {
	const body = document.querySelector("body");
	const bgAlert = document.createElement("div");
	bgAlert.classList.add("bg-alert");

	const alert = document.createElement("div");
	alert.classList.add("div-alert");

	alert.innerHTML = `
    	<div class="logo-header-modal">
			<picture>
				<source srcset="/media/logos/logo-pataverso-200w.avif" type="image/avif">
				<source srcset="/media/logos/logo-pataverso-200w.webp" type="image/webp">
				<source srcset="/media/logos/logo-pataverso-200w.png" type="image/png">
				<img src="/media/logos/logo-pataverso.png"/>
			</picture>
		</div>

        <h2>Gracias ${user.nombre}</h2>
        <p>Los ${quantity}€ donados seran utilizados para mejorar la calidad de vida de nuestras mascotas</p>
    `;

	bgAlert.appendChild(alert);
	body.appendChild(bgAlert);

	setTimeout(() => {
		bgAlert.remove();
	}, 4000);
};

/**
 * @description
 * Initializes and manages the user donation workflow on the profile page.
 * Attaches a submit listener to the donation form, validates the user’s password,
 * updates the user’s donated amount, persists changes to localStorage,
 * updates the on-page donation counter, and displays a thank-you modal.
*
* @dependencies
* - DOM elements:
*   • A `<form>` with class `.form-charitable-donation`.
*   • An `<input>` with ID `#input-donation-quantity` for the donation amount.
*   • An `<input>` with ID `#input-donation-password-confirmation` for password confirmation.
*   • A `<span>` with class `.span-donation-counter` for displaying total donations.
* - Storage helpers:
*   • `getDataFromStorage(key: string): any`
*   • `saveDataInStorage(key: string, value: any): void`
* - Utility functions:
*   • `handleAlertOnForm(message: string): void` — displays validation alerts.
*   • `recalculateDonations(user: Object): void` — updates the donation counter.
*   • `donationThanksModal(amount: number, user: Object): void` — shows a thank-you modal.
 * @function handleUserDonation
 * @returns {void}
 */
const handleUserDonation = () => {
	const donationForm = document.querySelector(".form-charitable-donation");
	if (!donationForm) {
		console.error("No se encontro la etiqueta <form> en profile.html");
		return;
	}
	const users = getDataFromStorage("usersData");
	if (!users) {
		console.error("No se encontró usersData en localstorage");
		return;
	}
	if (!users.length) {
		console.error("El array users esta vacio");
		return;
	}
	const currentUser = getDataFromStorage("currentUser");
	if (!currentUser) {
		console.error("No se encontró currentUser en localStorage");
		return;
	}
	const userIndex = users.findIndex((user) => user.id === currentUser.id);
	if (userIndex === -1) {
		console.error("No se encontro userIndex por ID.");
		return;
	}
	const user = users[userIndex];

	donationForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const quantityToDonate = document.querySelector("#input-donation-quantity");
		const confirmationPass = document.querySelector("#input-donation-password-confirmation");

		if (confirmationPass.value !== user.password) {
			handleAlertOnForm("La contraseña es incorrecta");
			event.target.reset();
			return;
		}
		const quantity = Number(quantityToDonate.value);
		user.donated += quantity;
		event.target.reset();
		saveDataInStorage("usersData", users);
		recalculateDonations(user);
		donationThanksModal(quantity, user);
	});
	recalculateDonations(user);
};

document.addEventListener("DOMContentLoaded", () => {
	imageFixer();
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
	renderProductsBought();
	handleUserDetailsForm();
	openMobileNav();
	linksInteraction();
	handleUserDonation();
	logoutprofile();
	floatingButton();
});
