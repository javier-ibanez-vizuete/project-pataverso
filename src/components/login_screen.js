import { firstRender, USERS_DATA } from "../app.js";

import { getDataFromStorage, saveDataInStorage } from "../helpers/storage.js";
const verificationUser = async (newUser) => {
	let currentUserLogged = newUser;
	const users = await getDataFromStorage("usersData");
	const userDuplicate = users.some((user) => user.email === newUser.email);

	if (userDuplicate) {
		return alert("El correo electronico introducido ya esta registrado");
	}
	if (!userDuplicate) {
		USERS_DATA.push(newUser);
		saveDataInStorage("currentUser", currentUserLogged);
		saveDataInStorage("usersData", USERS_DATA);
		saveDataInStorage("sesionIsOpen", true);
		handleSeason();
		firstRender();
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
		isBanned: false,
	};
	verificationUser(newUser);
};

const handleRegisterForm = () => {
	const btnRegisterUser = document.querySelector(".btn-submit-register");
	const formRegister = document.querySelector(".form-register-user");
	btnRegisterUser.addEventListener("click", (event) => {
		event.preventDefault();
		createUser();
		formRegister.reset();
	});
};
const validationLogin = (userForLogin) => {
	const usersRegistered = getDataFromStorage("usersData");
	const userBanned = usersRegistered.find((user) => user.isBanned);
	if (userBanned) {
		return alert("Su cuenta esta temporalmente en revisión")
	}
	const correctLogin = usersRegistered.find((user) => {
		const email = user.email === userForLogin.email;
		const password = user.password === userForLogin.password;
		return email && password;
	});
	if (!correctLogin) {
		return alert("Email o contraseña incorrectos");
	}
	if (correctLogin) {
		const userOnCloud = usersRegistered.filter((user) => user.email === userForLogin.email);
		saveDataInStorage("currentUser", userOnCloud);
		saveDataInStorage("sesionIsOpen", true);
		handleSeason(correctLogin);
		firstRender();
	}
};

const loginUser = () => {
	const userEmail = document.querySelector(".input-email-login-form");
	const userPassword = document.querySelector(".input-password-login-form");
	if (!userEmail.value) {
		return alert("EMAIL REQUERIDO");
	}

	if (!userEmail.value.includes("@") || !userEmail.value.includes(".")) {
		return alert("Email no valido.");
	}

	if (!userPassword.value) {
		return alert("CONTRASEÑA INCORRECTA");
	}

	const currentUser = {
		email: userEmail.value.trim().toLowerCase(),
		password: userPassword.value.trim(),
	};
	validationLogin(currentUser);
};

const handleLoginForm = () => {
	const btnLoginUser = document.querySelector(".btn-submit-login");
	const formLogin = document.querySelector(".form-login-user");
	btnLoginUser.addEventListener("click", (event) => {
		event.preventDefault();
		loginUser();
		formLogin.reset();
	});
};

export const handleBtnsForms = () => {
	const btnLogin = document.querySelector(".btn-open-login-form");
	const btnRegister = document.querySelector(".btn-open-register-form");
	const loginForm = document.querySelector(".form-login-user");
	const registerForm = document.querySelector(".form-register-user");

	btnLogin.addEventListener("click", () => {
		registerForm.reset();
		btnLogin.classList.add("selected-btn-form");
		btnRegister.classList.remove("selected-btn-form");
		loginForm.classList.add("selected-login-form");
		registerForm.classList.remove("selected-login-form");
	});

	btnRegister.addEventListener("click", () => {
		loginForm.reset();
		btnRegister.classList.add("selected-btn-form");
		btnLogin.classList.remove("selected-btn-form");
		registerForm.classList.add("selected-login-form");
		loginForm.classList.remove("selected-login-form");
	});
};

export const hideLoginPage = () => {
	const loginPage = document.querySelector(".login-section-bg");
	const header = document.querySelector("#header");
	const main = document.querySelector("#main");
	const footer = document.querySelector("#footer");

	loginPage.classList.add("dont-show");
	header.classList.remove("dont-show");
	main.classList.remove("dont-show");
	footer.classList.remove("dont-show");
};

const showLoginPage = () => {
	const loginPage = document.querySelector(".login-section-bg");
	const header = document.querySelector("#header");
	const main = document.querySelector("#main");
	const footer = document.querySelector("#footer");

	loginPage.classList.remove("dont-show");
	header.classList.add("dont-show");
	main.classList.add("dont-show");
	footer.classList.add("dont-show");
};

const pathName = window.location.pathname;
const isIndex = pathName === "/" || pathName.endsWith("/index.html");

export const handleSeason = async () => {
	const openSesion = await getDataFromStorage("sesionIsOpen");
	if (openSesion) {
		if (isIndex) hideLoginPage();
	} else {
		if (!isIndex) {
			window.location.href = "/index.html";
		}
		handleBtnsForms();
		showLoginPage();
		handleRegisterForm();
		handleLoginForm();
	}
};

export const loginScreenLauncher = () => {
	handleSeason();
};
