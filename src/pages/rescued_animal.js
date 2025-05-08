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

const handleLogin = () => {
	const sesionIsOpen = getDataFromStorage("sesionIsOpen");
	console.log("Que vale sesion is open ", sesionIsOpen);
	if (!sesionIsOpen) {
		window.location.href = "/index.html";
	}
};

const fileToDataUrl = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(file);
	});

const addPetToArray = async () => {
	const h1 = document.querySelector("h1");
	const formRescuedAnimal = document.querySelector(".form-rescued-animal");
	const inputName = document.getElementById("input-rescued-animal-name");
	const inputType = document.getElementById("select-rescued-animal-type");
	const inputGenre = document.getElementById("select-rescued-animal-genre");
	const inputVaccinated = document.getElementById("select-rescued-animal-vaccinated");
	const inputSterilized = document.getElementById("select-rescued-animal-sterilized");
	const inputImage = document.getElementById("input-rescued-animal-image");

	try {
		const imageDataUrl = await fileToDataUrl(inputImage.files[0]);
		const animal = {
			id: Date.now(),
			nombre: inputName.value,
			tipo: inputType.value,
			genero: inputGenre.value,
			vacunas: Number(inputVaccinated.value),
			esterilizado: Number(inputSterilized.value),
			imagen: imageDataUrl
				? imageDataUrl
				: "/media/pictures/image-pets-homepage/image-animals-home-page-480w.avif",
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
