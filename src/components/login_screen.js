import { firstRender, USERS_DATA } from "../app.js";
import { handleAlertOnLogin } from "../helpers/alerts.js";
import { petsCounter } from "../helpers/pets_counter.js";
import { getDataFromStorage, saveDataInStorage } from "../helpers/storage.js";

/**
 * Checks for duplicate users and registers a new user if none exists.
 *
 * This asynchronous function retrieves existing users from storage,
 * verifies that the new user's ID/EMAIL is not already registered,
 * and if unique:
 *   1. Adds the new user to the global USERS_DATA array.
 *   2. Saves the new user as the current user.
 *   3. Updates the usersData and session flag in storage.
 *   4. Calls 'handleSeason' to adjust the UI for the logged-in state.
 *   5. Calls 'firstRender' to fetch initial data for user.
 * If a duplicate is fond, it displays an alert indicating the email is already registered.
 *
 * @async
 * @function verificationUser
 * @param {Object} newUser - The user object to verify and register.
 * @param {number} newUser.id - A unique identifier for the user.
 * @param {string} newUser.nombre - The user's full name.
 * @param {string} newUser.email - The user's email address.
 * @param {string} newUser.password - The user's chosen password.
 * @param {boolean} newUser.allowToNewsLetter - Whether the user opted into newsletters.
 * @param {boolean} newUser.is_banned - Whether the user is banned (should be false for new users).
 * @param {Array} newUser.sponsoring - Sponsoring data array.
 * @param {Object} newUser.sponsor_details - Detailed sponsorship preferences.
 * @returns Resolves after registration or returns early on duplicate.
 */
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
		await firstRender();
		petsCounter();
	}
};

/**
 * Validates registration form inputs and constructs a new user object.
 *
 * This function checks that the name and email fields are populated and that the email
 * has a basic valid format. It then gathers values from the name, email, password, and newsletter checkbox input to build a 'newUser' object with default sponsorship data,
 * and passes it to 'verificationUser' for further checks and storage.
 *
 * @function createUser
 * @returns {void}
 */
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
		donated: 0,
		products_bought: [],
	};
	verificationUser(newUser);
};

/**
 * Attaches submission handling to the registration form's submit button.
 *
 * This function prevents the default form submission behavior,
 * invokes the 'createUser' funtion to register a new user,
 * and then resets the registration form fields.
 *
 * @function handleRegisterForm
 */
const handleRegisterForm = () => {
	const btnRegisterUser = document.querySelector(".btn-submit-register");
	const formRegister = document.querySelector(".form-register-user");
	btnRegisterUser.addEventListener("click", (event) => {
		event.preventDefault();
		createUser();
		formRegister.reset();
	});
};

/**
 * Validates user credentials, handles banned status, and initializes session on succes.
 *
 * This funtion retrieves all registered users from storage and:
 *  1. Check for a matching email/password combination.
 *  2. If no match is found, shows an 'incorrect email or password' alert.
 *  3. If the user is banned, shows an 'account under review' alert.
 *  4. If credentials are correct and not bannet:
 *    - Stores the authenticated user in 'currentUser'.
 *    - Marks the session as open ('sesionIsOpen' = true).
 *    - Calls 'handleSeason' to adjust UI based on login state.
 *    - Calls 'firstRender' to fetch any initial data.
 *
 * @function validationLogin
 * @param {{ email: string, password: string }} userForLogin - The credentials entered by the user.
 * @returns {void}
 */
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

/**
 * Validates login form inputs and initiates user authentication.
 *
 * This function checks that the email and password fields are populated
 * and the email has a basic valid format. If a validation error
 * occurs, it calls 'handleAlertOnLogin' with an appropriate message.
 * Otherwise, it constructs a 'currentUser' object and passes it to 'validationLogin' for authentication.
 *
 * @function loginUser
 * @returns {void}
 */
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

/**
 * Attaches submission handling to the login form's submit button.
 *
 * This function prevents the default form submission behavior,
 * invokes the 'loginUser' function to process the credentials,
 * and then reset the login form fields.
 *
 * @function handleLoginForm
 */
const handleLoginForm = () => {
	const btnLoginUser = document.querySelector(".btn-submit-login");
	const formLogin = document.querySelector(".form-login-user");
	btnLoginUser.addEventListener("click", (event) => {
		event.preventDefault();
		loginUser();
		formLogin.reset();
	});
};

/**
 * Sets up toggle behavior between the login and registration forms.
 *
 * Adds click event listeners to the 'login' and 'register' button that:
 *  1. Reset the opposite form.
 *  2. Apply a 'selected' style to the clicked button.
 *  3. Toggle visibilitty classes to show the correspondig form and hide the other.
 *
 * @function handleBtnsForms
 */
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

/**
 * Hides the login page and reveals the main site content.
 *
 * This function toggles visibility classes to conceal the login section
 * while displaying the header, main content, and footer.
 *
 * @function hideLoginPage
 */
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

/**
 * Reveals the login page and hides the main site content.
 *
 * This function toggles visisbility classes to display the login section
 * while concealing the header, main content, and footer.
 *
 * @function showLoginPage
 */
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

/**
 * Manages application behavior based on whether a user session is open.
 *
 * This asynchronous function checks local storage for an active session flag ('sesionIsOpen').
 *  - If a session is open and the current page is the index, it hides the login page.
 *  - If no session is open:
 *   1. Redirects to the index page if not already there.
 *   2. Initializes form buttons and displays the login page.
 *   3. Sets up registration and login form handlers.
 *
 * @async
 * @function handleSeason
 * @returns Resolves after session check and UI adjustments are applied.
 */
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
/**
 * Initializes and displays the login screen by invoking seasonal adjustments.
 *
 * This function is responsible for launching the login screen sequence.
 * Currently, it applies any necessary seasonal theming or data via 'handleSeason()'
 *
 * @function loginScreenLauncher
 */
export const loginScreenLauncher = () => {
	handleSeason();
};
