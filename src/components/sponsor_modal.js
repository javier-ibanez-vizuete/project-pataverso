import { getDataFromStorage, saveDataInStorage } from "../helpers/storage.js";

/**
 * Displays a thank-you modal after a succesful sponsorship.
 * 
 * This function creates an overlay modal with a personalized message
 * thanking the user by name for sponsoring the specified animal.
 * It then automatically reloads the page after 5 seconds.
 * 
 * @function congratulationForSponsoring
 * @param {string} userName - The full name of the sponsoring user.
 * @param {string} animalName - The name of the animal sponsored.
 */
const congratulationForSponsoring = (userName, animalName) => {
	const body = document.querySelector("body");
	const sponsorForm = document.querySelector(".bg-modal");

	const bgModal = document.createElement("div");
	bgModal.classList.add("bg-congrats-modal");

	const modal = document.createElement("div");
	modal.classList.add("congrats-modal");

	modal.innerHTML = `
		<div class="logo-header-modal">
			<picture>
				<source srcset="/media/logos/logo-pataverso-200w.avif" type="image/avif">
				<source srcset="/media/logos/logo-pataverso-200w.webp" type="image/webp">
				<source srcset="/media/logos/logo-pataverso-200w.png" type="image/png">
				<img src="/media/logos/logo-pataverso.png"/>
			</picture>
		</div>
		<h3>Muchisimas gracias ${userName}</h3>
		<h4>por apadrinar a ${animalName}.</h4>
		<p>Desde Pataverso.com le deseamos un Maravilloso dia</p>
	`;
	bgModal.appendChild(modal);
	body.append(bgModal);

	setTimeout(() => {
		window.location.reload();
	}, 5000);
};

/**
 * Updates user data with new sponsorship`details and persists changes.
 *
 * This function retrieves the stored users array, adds the specified animal
 * to the current user's sponsoring list, merges any missing sponsor details
 * from the form response, saves the updated users array back to storage,
 * and triggers a congratulatory message.
 *
 * @function handleUserContent
 * @param {Object} response - The form data submitted by the user.
 * @param {string} response.user_name - Full name of the sponsor.
 * @param {string} response.user_tel - Contact telephone number.
 * @param {string} response.user_country - Country of residence.
 * @param {string} response.user_reason - Reason for sponsoring.
 * @param {string|boolean} response.user_notification - Notification preference or false.
 * @param {string} response.user_donation - Type of donation selected.
 * @param {string} response.user_donation_frecuency - Sponsorship duration selected.
 * @param {string|boolean} response.user_participation - Event participation preference or false.
 * @param {Object} animal - The animal object being sponsored.
 * @param {number|string} animal.id - Unique identifier of the animal.
 * @param {string} animal.nombre - Name o the animal (used in confirmation).
 * @param {number} userIndex - Index of the current user in the stored users array.
 */
const handleUserContent = (response, animal, userIndex) => {
	const users = getDataFromStorage("usersData");
	const user = users[userIndex];
	const details = user.sponsor_details;

	user.sponsoring.push(animal);
	console.log("Respuesta", response);
	console.log("animal", animal);
	console.log("users", users);
	console.log("user", user);
	console.log("details", details);

	// 	export let USERS_DATA = [
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
	Object.entries({
		nombre_completo: response.user_name,
		telefono: response.user_tel,
		pais: response.user_country,
		sponsor_reason: response.user_reason,
		notification_type: response.user_reason,
		colaboration_type: response.user_donation,
		colaboration_time: response.user_donation_frecuency,
		participation_events: response.user_participation,
	}).forEach(([key, value]) => {
		if (!details[key]) {
			details[key] = value;
		}
	});

	saveDataInStorage("usersData", users);
	const { user_name } = response;
	const { nombre } = animal;
	congratulationForSponsoring(user_name, nombre);
};

/**
 * Checks if current user has already sponsored the specified animal.
 *
 * This function retrieves the current user and all users's data from storage,
 * finds the user index, and determines if the user has already sponsored the
 * given animal. If the user is not found, the promise is rejected with an error.
 * If the user has already sponsored the animal, the modal is closed and the
 * promise is rejected with a duplicate a duplicate sponsorship message. Otherwise,
 * the promise resolves with the user's index.
 *
 * @function validateDuplicateSponsor
 * @param {Object} animal - The animal object to check sponsorship against.
 * @param {number|string} animal.id - The unique identifier of the animal.
 * @returns {promise} A promise that resolve with the current user's index or rejects with an error message.
 */
const validateDuplicateSponsor = (animal) =>
	new Promise((resolve, reject) => {
		const currentUser = getDataFromStorage("currentUser");
		const users = getDataFromStorage("usersData");
		const userIndex = users.findIndex((user) => {
			console.log("currentUser.email", currentUser.email);
			console.log("user.email", user.email);
			return user.email === currentUser.email;
		});
		if (userIndex === -1) return reject("Usuario No Encontrado");
		const isDuplicateSponsor = users[userIndex].sponsoring?.some(
			(animalSponsored) => animalSponsored.id === animal.id
		);
		if (isDuplicateSponsor) {
			const sponsorForm = document.querySelector(".bg-modal");
			sponsorForm.remove();
			reject("Ya eres padrino de este Peludito");
			return;
		}
		resolve(userIndex);
	});

/**
 * Display a temporary alert modal highlighting a required form field.
 *
 * This function creates an overlay modal containing a logo header, title,
 * message indicating the missing or invalid field (using the provided input's
 * text content), and a close button. The modal automatically disappears afer
 * 4 seconds or can be closed manually by the user.
 *
 * @function createAlertModal
 * @param {HTMLElement} input - The form input element whose label/text is shown in the alert.
 */
const createAlertModal = (input) => {
	const body = document.querySelector("body");
	const bgAlertModal = document.createElement("div");
	bgAlertModal.classList.add("bg-alert-modal");

	const alertModal = document.createElement("div");
	alertModal.classList.add("alert-modal");

	alertModal.innerHTML = `
		<div class="logo-header-modal">
			<picture>
				<source srcset="/media/logos/logo-pataverso-200w.avif" type="image/avif">
				<source srcset="/media/logos/logo-pataverso-200w.webp" type="image/webp">
				<source srcset="/media/logos/logo-pataverso-200w.png" type="image/png">
				<img src="/media/logos/logo-pataverso.png"/>
			</picture>
		</div>
		<h3>ATENCIÓN</h3>
		<h5>Campo obligatorio:</h5>
		<p>${input.textContent}</p>
		<button class="btn-close-alert-modal btn-style">Volver al formulario</button>
	`;

	bgAlertModal.appendChild(alertModal);
	body.appendChild(bgAlertModal);
	const timerToRemoveAlert = setTimeout(() => {
		bgAlertModal.remove();
	}, 4000);
	const btnCloseAlertModal = document.querySelector(".btn-close-alert-modal");
	btnCloseAlertModal.addEventListener("click", () => {
		clearTimeout(timerToRemoveAlert);
		bgAlertModal.remove();
	});
};

/**
 * Attaches handlers to the sponsor form for validation, submision, and cancellation.
 *
 * This function selects the sponsorship form and its inputs elements, retrieves
 * the current user and stored users data, and set up:
 *   - A submit listener that validates required select fields, gather form data,
 *     check for duplicate sponsorship, processes the submission, and reset the form.
 *   - A cancel listener on the rejection button that closes the modal, reset the form,
 *     and scrolls the expanded pet title back into view.
 *
 * @function handleSponsorForm
 * @param {Object} animal - The animal object being sponsored.
 * @param {string} animal.nombre - The name of the animal (used in duplicate validation).
 */
const handleSponsorForm = (animal) => {
	const form = document.querySelector(".sponsor-form-container");
	const userName = document.querySelector("#input-sponsor-form-name");
	const userTel = document.querySelector("#input-sponsor-form-tel");
	const userCountry = document.querySelector("#input-sponsor-form-country");
	const userSponsorReason = document.querySelector("#textarea-sponsor-form-reason");
	const userWantNotification = document.querySelector("#select-sponsor-form-pet-notification");
	const userDonationTypeLabel = document.querySelector(".label-sponsor-form-donation-type");
	const userDonationType = document.querySelector("#select-sponsor-form-donation-type");
	const userDonationFrecuencyLabel = document.querySelector(".label-sponsor-form-sponsoring-duration");
	const userDonationFrecuency = document.querySelector("#select-sponsor-form-sponsoring-duration");
	const userParticipationEventsLabel = document.querySelector(".label-sponsor-form-events-participation");
	const userParticipationEvents = document.querySelector("#select-sponsor-form-events-participation");
	const btnRejectSponsorForm = document.querySelector(".btn-reject-sponsor-form");

	const currentUser = getDataFromStorage("currentUser");
	const users = getDataFromStorage("usersData");
	const userIndex = users.findIndex((user) => user.email === currentUser.email);

	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		if (userDonationType.value === "disabled") {
			createAlertModal(userDonationTypeLabel);
			return;
		}
		if (userDonationFrecuency.value === "disabled") {
			createAlertModal(userDonationFrecuencyLabel);
			return;
		}
		if (userParticipationEvents.value === "disabled") {
			createAlertModal(userParticipationEventsLabel);
			return;
		}

		const results = {
			user_name: userName.value,
			user_tel: userTel.value,
			user_country: userCountry.value ? userCountry.value : "Desconocido",
			user_reason: userSponsorReason.value,
			user_notification: userWantNotification.value === "disabled" ? false : userWantNotification.value,
			user_donation: userDonationType.value,
			user_donation_frecuency: userDonationFrecuency.value,
			user_participation: userParticipationEvents.value,
		};

		if (userIndex !== -1) {
			try {
				const userIndex = await validateDuplicateSponsor(animal);
				handleUserContent(results, animal, userIndex);
				form.reset();
			} catch (error) {
				alert(error);
				return;
			}
		}
	});

	btnRejectSponsorForm.addEventListener("click", (event) => {
		event.preventDefault();
		const modal = document.querySelector(".bg-modal");
		const expandedCardTitle = document.querySelector(".h2-pet-title");

		form.reset();
		modal.remove();
		expandedCardTitle.scrollIntoView({ behavior: "smooth", block: "center" });
	});
};

/**
 * Creates and display a modal form for sponsoring a specific animal.
 *
 * This function dynamically builds a modal overlay containing a detailed
 * sponsorship form personalized with the animal's name. The form collects
 * personal details, motivation for sponsoring, and preferences such as update notifications and type of support.
 *
 * Once rendered, the modal is appended to the DOM, and a handler is attached to manage form behavior (submision, cancellation, etc...).
 *
 * @function createSponsorModal
 * @param {Object} animal - The animal object containing data for personalization.
 * @param {string} animal.nombre - The name of the animal to include in the form content.
 */
export const createSponsorModal = (animal) => {
	const body = document.querySelector("body");

	const bgModal = document.createElement("div");
	bgModal.classList.add("bg-modal");

	const modal = document.createElement("div");
	modal.classList.add("modal", "modal-for-sponsor");

	modal.innerHTML = `
		<h2>Formulario para Apadrinar a ${animal.nombre}</h2>

		<p>¡Gracias por querer formar parte de nuestra familia peluda!</p>

		<p>Estás a punto de apadrinar a ${animal.nombre}, así que solo necesitamos algunos datos más para hacerlo oficial:</p>

		<form action="#" method="get" class="sponsor-form-container">
			<div class="input-sponsor-container">
				<label for="input-sponsor-form-name">Nombre completo</label>
				<input type="text" name="input-sponsor-form-name" id="input-sponsor-form-name" minlength="8" maxlength="60"
					required placeholder="Introduce tu nombre completo">
			</div>
			<div class="input-sponsor-container">
				<label for="input-sponsor-form-tel">Número de teléfono</label>
				<input type="tel" name="input-sponsor-form-tel" id="input-sponsor-form-tel" required
					placeholder="Introduce un teléfono de contacto">
			</div>
			<div class="input-sponsor-container">
				<label for="input-sponsor-form-country">País de residencia</label>
				<input type="text" name="input-sponsor-form-country" id="input-sponsor-form-country" minlength="4"
					maxlength="20" placeholder="Introduce tu país de residencia">
			</div>
			<div class="input-sponsor-container">
				<label for="textarea-sponsor-form-reason">¿Por qué has elegido apadrinar a ${animal.nombre}</label>
				<textarea name="textarea-sponsor-form-reason" id="textarea-sponsor-form-reason" required
					placeholder="Introduce tus razones para apadrinar..."></textarea>
			</div>
			<div class="input-sponsor-container">
				<label for="select-sponsor-form-pet-notification" class="label-sponsor-form-pet-notification">¿Te gustaría recibir actualizaciones sobre tu
					ahijad@?</label>
				<select name="select-sponsor-form-pet-notification" id="select-sponsor-form-pet-notification" required>
					<option value="disabled" disabled selected>No quiero recibir actualizaciones</option>
					<option value="images-monthly">Fotos mensuales</option>
					<option value="videos-monthly">Videos mensuales</option>
					<option value="images-videos-monthly">Imagenes y videos mensuales</option>
				</select>
			</div>
			<div class="input-sponsor-container">
				<label for="select-sponsor-form-donation-type" class="label-sponsor-form-donation-type">¿Que tipo de colaboracion te gustaria ofrecer?</label>
				<select name="select-sponsor-form-donation-type" id="select-sponsor-form-donation-type" required>
					<option value="disabled" disabled selected>Elige una opcion</option>
					<option value="payment-monthly">Aportación económica mensual</option>
					<option value="payment-onetime">Donación puntual</option>
				</select>
			</div>
			<div class="input-sponsor-container">
				<label for="select-sponsor-form-sponsoring-duration" class="label-sponsor-form-sponsoring-duration">¿Durante cuánto tiempo te gustaría apadrinar?</label>
				<select name="select-sponsor-form-sponsoring-duration" id="select-sponsor-form-sponsoring-duration" required>
					<option value="disabled" disabled selected>Elige una opción</option>
					<option value="three-months">3 meses</option>
					<option value="six-months">6 meses</option>
					<option value="one year">1 año</option>
					<option value="no-limit">Sin límite (¡Mientras me necesite!)</option>
				</select>
			</div>
			<div class="input-sponsor-container">
				<label for="select-sponsor-form-events-participation" class="label-sponsor-form-events-participation">¿Deseas participar en eventos o actividades
					relacionadas con tu ahijad@?</label>
				<select name="select-sponsor-form-events-participation" id="select-sponsor-form-events-participation"
					required>
					<option value="disabled" disabled selected>Elige una opcion</option>
					<option value="yes">Si, ¡me ecantaría!</option>
					<option value="no">No por ahora</option>
				</select>
			</div>

			<div class="sponsor-btns-container">
				<button class="btn-apply-sponsor-form btn-style">Enviar Solicitud</button>
				<button class="btn-reject-sponsor-form btn-style">Cancelar Solicitud</button>
			</div>
		</form>
	`;

	bgModal.append(modal);
	body.append(bgModal);
	handleSponsorForm(animal);
};
