import { getDataFromStorage, saveDataInStorage } from "../helpers/storage.js";

let ANIMALS_DATA_BASE = {
	perro: [],
	gato: [],
	conejo: [],
};
if (!getDataFromStorage("animalsData")) {
	saveDataInStorage("animalsData", ANIMALS_DATA_BASE);
}
if (getDataFromStorage("animalsData")) {
	ANIMALS_DATA_BASE = getDataFromStorage("animalsData");
}

/**
 * @description
 * Verifies whether a user session is currently active by checking the 'sesionIsOpen' flag
 * in local storage. If the sesion is not open (User is not logged in),
 * the function redirects the user to the home page ('/index.html').
 * 
 * This function helps restrict acces to certain pages or features unless a valid session exists.
 * 
 * @dependencies
 *  - getDataFromStorage: Utility function for retrieving values from local storage.
 *  - window.location.href: Used for redirection to the homepage.
 * 
 * @function handleLogin
 * @returns {void}
 */
const handleLogin = () => {
	const sesionIsOpen = getDataFromStorage("sesionIsOpen");
	console.log("Que vale sesion is open ", sesionIsOpen);
	if (!sesionIsOpen) {
		window.location.href = "/index.html";
	}
};

/**
 * @description
 * Converts a 'File' object (Typically from an <input type="file"> element)
 * into a base64-enconded Data URL string using the FileReader API.
 * 
 * This is useful for previewing images in the browser or storing them in a format
 * compatible with localStorage or JSON APIs.
 * 
 * @function fileToDataURL
 * @param {file} file - The file to be converted to a Data URL.
 * @returns {Promise<string>} A Promise that resolves with the base64 Data URL string of the file.
 * @dependencies
 *  - FileReader API (Web API).
 */
const fileToDataUrl = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(file);
	});

	/**
	 * @description
	 * Asynchronously creates a new 'animal' object from the rescued animal form inputs,
	 * converts its image file to a base64 DataURL, adds the object to the global animal database ('ANIMAL_DATA_BASE'),
	 * and persists the update data in the browser's localstorage.
	 * 
	 * On succes, displays a confirmation alert to the user and resets the form.
	 * On failure, logs the error to the console and shows an error alert to the user.
	 * 
	 * @dependencies
	 *  - "fileToDataURL": Converts an image file into a base64-enconded string.
	 *  - "ANIMAL_DATA_BASE": A global object storing categorized animal records.
	 *  - "saveDataInStorage": Persists data to localStorage.
	 *  - DOM APIs: Uses 'querySelector' and 'getElementById' to access form elements.
	 *  - "alert" and "console.error": Used for user feedback and error reporting.
	 * 
	 * @async
	 * @function addPetToArray
	 * @returns {Promise<void>} This function does not return a value; it performs side effects only.
	 */
const addPetToArray = async () => {
	const h1 = document.querySelector("h1");
	const formRescuedAnimal = document.querySelector(".form-rescued-animal");
	const inputName = document.getElementById("input-rescued-animal-name");
	const inputType = document.getElementById("select-rescued-animal-type");
	const inputGenre = document.getElementById("select-rescued-animal-genre");
	const inputAge = document.getElementById("input-rescued-animal-age");
	const inputVaccinated = document.getElementById("select-rescued-animal-vaccinated");
	const inputSterilized = document.getElementById("select-rescued-animal-sterilized");
	const inputDescription = document.getElementById("textarea-rescued-animal-description");
	const inputPersonality = document.getElementById("textarea-rescued-animal-personality");
	const inputAdvice = document.getElementById("textarea-rescued-animal-advice");
	const inputImage = document.getElementById("input-rescued-animal-image");

	try {
		const imageDataUrl = await fileToDataUrl(inputImage.files[0]);
		const animal = {
			id: Date.now(),
			nombre: inputName.value,
			tipo: inputType.value,
			genero: inputGenre.value,
			edad: inputAge.value ? inputAge.value : "Desconocida",
			vacunas: Number(inputVaccinated.value),
			esterilizado: Number(inputSterilized.value),
			imagen: imageDataUrl
				? imageDataUrl
				: "/media/pictures/image-pets-homepage/image-animals-home-page-480w.avif",
			desc_fisica: inputDescription.value ? inputDescription.value : "Sin determinar",
			desc_personalidad: inputPersonality.value ? inputPersonality.value : "Sin determinar",
			desc_adicional: inputAdvice.value ? inputAdvice.value : "",
		};
		ANIMALS_DATA_BASE[inputType.value].push(animal);
		saveDataInStorage("animalsData", ANIMALS_DATA_BASE);
		alert("GRACIAS. NOS PONDREMOS EN CONTACTO CON USTED PARA ORGANIZAR RECOGIDA");
		h1.scrollIntoView({ behavior: "smooth", block: "center" });
		formRescuedAnimal.reset();
	} catch (error) {
		console.error(error);
		alert("No hemos podido procesar los datos de su mascota. Por favor intentelo de nuevo mas tarde");
	}
};

/**
 * Validates the rescued-animal form inputs and either shows an error
 * or proceeds to add the pet to the data array.
 * 
 * This function enforces the following rules:
 *  1. Name must be non-empty and between 4-15 characters.
 *  2. Type, gender, vaccination, and sterilization selects must not be "disbled".
 *  3. An image file must be provided.
 * 
 * On validation failure, an alert is shown, the offending field is scrolled
 * into view and focused, and the function returns early. If all checks pass,
 * it calls 'addPetToArray()' to persist the new animal.
 * 
 * @function validateInputs
 * @returns {void}
 */
const validateInputs = () => {
	const inputName = document.getElementById("input-rescued-animal-name");
	const inputType = document.getElementById("select-rescued-animal-type");
	const inputGenre = document.getElementById("select-rescued-animal-genre");
	const inputVaccinated = document.getElementById("select-rescued-animal-vaccinated");
	const inputSterilized = document.getElementById("select-rescued-animal-sterilized");
	const inputImage = document.getElementById("input-rescued-animal-image");

	if (!inputName.value.length) {
		alert("Por favor Introduce un nombre para la mascota");
		inputName.scrollIntoView({ behavior: "smooth", block: "center" });
		inputName.focus();
		return;
	}

	if (inputName.value.length < 4 || inputName.value.length > 15) {
		alert("El nombre debe tener entre 4 y 15 caracteres");
		inputName.value = "";
		inputName.scrollIntoView({ behavior: "smooth", block: "center" });
		inputName.focus();
		return;
	}

	if (inputType.value === "disabled") {
		alert("Por favor selecciona una mascota");
		inputType.scrollIntoView({ behavior: "smooth", block: "center" });
		inputType.focus();
		return;
	}

	if (inputGenre.value === "disabled") {
		alert("Por favor Selecciona un Genero");
		inputGenre.scrollIntoView({ behavior: "smooth", block: "center" });
		inputGenre.focus();
		return;
	}

	if (inputVaccinated.value === "disabled") {
		alert("Debes especificar si la mascota ha sido vacunada");
		inputVaccinated.scrollIntoView({ behavior: "smooth", block: "center" });
		inputVaccinated.focus();
		return;
	}

	if (inputSterilized.value === "disabled") {
		alert("Debes especificar si la mascota ha sido esterilizada");
		inputSterilized.scrollIntoView({ behavior: "smooth", block: "center" });
		inputSterilized.focus();
		return;
	}

	if (!inputImage.files.length > 0) {
		alert("Debes añadir una fotografia de la mascota");
		inputImage.scrollIntoView({ behavior: "smooth", block: "center" });
		inputImage.focus();
		return;
	}

	addPetToArray();
};

/**
 * Attaches submission and cancellation behavior to the rescued-animal form.
 * 
 * This function follows clean code principles by:
 *   - Using descriptive naming.
 *   - Encapsulating event listener setup without side effects.
 *   - Preventing default form behavior and delegating validation.
 * 
 * @function handleForms
 */
const handleForms = () => {
	const form = document.querySelector(".form-rescued-animal");
	const btnSubmitForm = document.querySelector(".apply-rescued-animal-form");
	const btnCancelForm = document.querySelector(".btn-go-to-index");

	btnSubmitForm.addEventListener("click", (event) => {
		event.preventDefault();
		validateInputs();
	});
	btnCancelForm.addEventListener("click", (event) => {
		event.preventDefault();
		form.reset();
		window.location.href = "/index.html";
	});
};

document.addEventListener("DOMContentLoaded", () => {
	handleLogin();
	handleForms();

	console.log(ANIMALS_DATA_BASE);
});
