import { sesionIsOpen, USERS_DATA } from "../app.js";
import { getDataFromStorage, saveDataInStorage } from "../helpers/storage.js";
const verificationUser = async (newUser) => {
	console.log("Registrando al usuario =>", newUser);
	const users = await getDataFromStorage("usersData");
	console.log("que vale users", users);
		const userDuplicate = USERS_DATA.some((user) => user.email === newUser.email);
		if (userDuplicate) {
			return alert("El correo electronico introducido ya esta registrado");
		}
		if (!userDuplicate) {
			USERS_DATA.push(newUser);
			saveDataInStorage("usersData");
			saveDataInStorage("sesionIsOpen", true);
			console.log("que vale sesion is open tras crear usuario", sesionIsOpen);
			loginValidation();
		}
};

const createUser = () => {
	const userName = document.querySelector("#input-name-register-form");
	const userEmail = document.querySelector("#input-email-register-form");
	const userPassword = document.querySelector("#input-password-register-form");
	const checkboxNewsLetter = document.querySelector("#input-checkbox-register-form");

	if (!userName.value) {
		return alert("NOMBRE REQUERIDO");
	}

	if (!userEmail.value) {
		return alert("EMAIL REQUERIDO");
	}

	if (!userEmail.value.includes("@") || !userEmail.value.includes(".")) {
		return alert("Email no valido.");
	}

	const newUser = {
		nombre: userName.value.trim(),
		email: userEmail.value.trim().toLowerCase(),
		password: userPassword.value.trim(),
		allowToNewsLetter: checkboxNewsLetter.checked,
	};
    console.log("Que vale userdata en local => ", getDataFromStorage("usersData"));
	if (!getDataFromStorage("usersData") || getDataFromStorage("usersData") === undefined) {
		saveDataInStorage("usersData", [newUser]);
		console.log(
			"NO habia usuario en el local estorage y ahora vale usersData => ",
			getDataFromStorage("usersData")
		);
	} else {
		console.log("Si habian datos de usuarios asi que entro en la funcion para verificar usuarios");
		verificationUser(newUser);
	}
};

const handleRegisterform = () => {
	const btnRegisterUser = document.querySelector(".btn-submit-register");
    const formRegister = document.querySelector(".form-register-user");
	btnRegisterUser.addEventListener("click", (event) => {
		event.preventDefault();
		createUser();
        formRegister.reset();
	});
};

const loginValidation = async (user) => {
	const loginPage = document.querySelector(".login-section-bg");
	const header = document.querySelector("#header");
	const main = document.querySelector("#main");
	const footer = document.querySelector("#footer");

	const openSesion = await getDataFromStorage("sesionIsOpen");
	if (openSesion) {
		console.log("SESION ABIERTA");
		loginPage.classList.add("dont-show");
		header.classList.remove("dont-show");
		main.classList.remove("dont-show");
		footer.classList.remove("dont-show");
	} else {
		console.log("SESION CERRADA");
		loginPage.classList.remove("dont-show");
		header.classList.add("dont-show");
		main.classList.add("dont-show");
		footer.classList.add("dont-show");
		handleRegisterform();
	}
};

export const loginScreenLauncher = () => {
	loginValidation();
	// console.log("Hola en LOGIN SCREEN");
};
