import { firstRender, USERS_DATA } from "../app.js";
import { handleAlertOnLogin } from "../helpers/alerts.js";
import { getDataFromStorage, saveDataInStorage } from "../helpers/storage.js";

const verificationUser = async (newUser) => {
	let currentUserLogged = newUser;
	const users = await getDataFromStorage("usersData");
	const userDuplicate = users.some((user) => user.id === newUser.id);

	if (userDuplicate) {
		return handleAlertOnLogin("El correo electrónico introducido ya esta registrado");
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
		return handleAlertOnLogin("Nombre requerido");
	}

	if (!userEmail.value) {
		return handleAlertOnLogin("Email Requerido");
	}

	if (!userEmail.value.includes("@") || !userEmail.value.includes(".")) {
		return handleAlertOnLogin("Email no valido");
	}

	// export let USERS_DATA = [
	// 	{
	// 		nombre: "admin",
	// 		email: "admin@admin.com",
	// 		password: "adminadmin",
	// 		allowToNewsLetter: true,
	// 		is_banned: false,
	// 		sponsoring: [],
	// 		sponsor_details: {
	// 			nombre_completo: "Admin Admin Admin",
	// 			telefono: "",
	// 			pais: "botnia",
	// 			sponsor_reason: "",
	// 			notification_type: true,
	// 			colaboration_type: "payment-monthly",
	// 			colaboration_time: "no-limit",
	// 			participation_events: true,
	// 		},
	// 	},
	// ];

	const newUser = {
		id: Date.now(),
		nombre: userName.value.trim(),
		email: userEmail.value.trim().toLowerCase(),
		password: userPassword.value.trim(),
		allowToNewsLetter: checkboxNewsLetter.checked,
		is_banned: false,
		sponsoring: [],
		sponsor_details: {
			nombre_completo: "",
			telefono: "",
			pais: "",
			sponsor_reason: "",
			notification_type: false,
			colaboration_type: "",
			colaboration_time: "",
			participation_events: false,
		},
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
	const userBanned = usersRegistered.filter((user) => user.email === userForLogin.email);
	const correctLogin = usersRegistered.find((user) => {
		const email = user.email === userForLogin.email;
		const password = user.password === userForLogin.password;
		return email && password;
	});

	if (!correctLogin) {
		return handleAlertOnLogin("Email o contraseña incorrectos");
	}
	if (userBanned[0].is_banned) {
		return handleAlertOnLogin("Su cuenta esta temporalmente en revisión");
	}
	if (correctLogin) {
		const currentUser = usersRegistered.filter((user) => {
			const email = user.email === userForLogin.email;
			const password = user.password === userForLogin.password;
			return email && password;
		});
		const userOnCloud = usersRegistered.filter((user) => user.id === currentUser[0].id);
		saveDataInStorage("currentUser", userOnCloud[0]);
		saveDataInStorage("sesionIsOpen", true);
		handleSeason(correctLogin);
		firstRender();
	}
};

const loginUser = () => {
	const userEmail = document.querySelector(".input-email-login-form");
	const userPassword = document.querySelector(".input-password-login-form");
	if (!userEmail.value) {
		return handleAlertOnLogin("Email Requerido");
	}

	if (!userEmail.value.includes("@") || !userEmail.value.includes(".")) {
		return handleAlertOnLogin("Email no valido");
	}

	if (!userPassword.value) {
		return handleAlertOnLogin("Contraseña Requerida");
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
