const createAlertModal = (input) => {
	const body = document.querySelector("body");
	const bgAlertModal = document.createElement("div");
	bgAlertModal.classList.add("bg-alert-modal");

	const alertModal = document.createElement("div");
	alertModal.classList.add("alert-modal");

	alertModal.innerHTML = `
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

const handleSponsorForm = (animalName) => {
	const form = document.querySelector(".sponsor-form-container");
	const userName = document.querySelector("#input-sponsor-form-name");
	const userTel = document.querySelector("#input-sponsor-form-tel");
	const userCountry = document.querySelector("#input-sponsor-form-country");
	const userSponsorReason = document.querySelector("#textarea-sponsor-form-reason");
	const userWantNotificationLabel = document.querySelector(".label-sponsor-form-pet-notification");
	const userWantNotification = document.querySelector("#select-sponsor-form-pet-notification");
	const userDonationTypeLabel = document.querySelector(".label-sponsor-form-donation-type");
	const userDonationType = document.querySelector("#select-sponsor-form-donation-type");
	const userDonationFrecuencyLabel = document.querySelector(".label-sponsor-form-sponsoring-duration");
	const userDonationFrecuency = document.querySelector("#select-sponsor-form-sponsoring-duration");
	const userParticipationEventsLabel = document.querySelector(".label-sponsor-form-events-participation");
	const userParticipationEvents = document.querySelector("#select-sponsor-form-events-participation");
	const btnRejectSponsorForm = document.querySelector(".btn-reject-sponsor-form");

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		if (userWantNotification.value === "disabled") {
			createAlertModal(userWantNotificationLabel);
			return;
		}
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
	});

	btnRejectSponsorForm.addEventListener("click", () => {
		const modal = document.querySelector(".bg-modal");
		const expandedCardTitle = document.querySelector(".h2-pet-title");

		form.reset();
		modal.remove();
		expandedCardTitle.scrollIntoView({behavior: "smooth", block: "center"})
	});
};

export const createSponsorModal = (animalName) => {
	const body = document.querySelector("body");

	const bgModal = document.createElement("div");
	bgModal.classList.add("bg-modal");

	const modal = document.createElement("div");
	modal.classList.add("modal", "modal-for-sponsor");

	modal.innerHTML = `
		<h2>Formulario para Apadrinar a ${animalName}</h2>

		<p>¡Gracias por querer formar parte de nuestra familia peluda!</p>

		<p>Estás a punto de apadrinar a ${animalName}, así que solo necesitamos algunos datos más para hacerlo oficial:</p>

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
				<label for="textarea-sponsor-form-reason">¿Por qué has elegido apadrinar a ${animalName}</label>
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
	handleSponsorForm(animalName);
};
