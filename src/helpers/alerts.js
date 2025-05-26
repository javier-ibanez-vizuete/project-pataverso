/**
 * Displayes a temporary login alert message modal.
 *
 * This function creates an overlay containing a styled alert box with a logo header and
 * the provided message. The alert automatically disappears after 2.5 seconds.
 *
 * @function handleAlertOnLogin
 * @param {string} message - The alert message to display in the modal.
 */
export const handleAlertOnLogin = (message) => {
	const body = document.querySelector("body");
	const bgAlert = document.createElement("div");
	bgAlert.classList.add("bg-alert-login");

	const alert = document.createElement("div");
	alert.classList.add("alert-login");

	alert.innerHTML = `
    	<div class="logo-header-modal">
			<picture>
				<source srcset="/media/logos/logo-pataverso-200w.avif" type="image/avif">
				<source srcset="/media/logos/logo-pataverso-200w.webp" type="image/webp">
				<source srcset="/media/logos/logo-pataverso-200w.png" type="image/png">
				<img src="/media/logos/logo-pataverso.png"/>
			</picture>
		</div>

        <h2>ATENCION</h2>
        <p>${message}</p>
    `;

	bgAlert.appendChild(alert);
	body.appendChild(bgAlert);

	setTimeout(() => {
		bgAlert.remove();
	}, 2500);
};

/**
 * @description
 * Display a transient modal-style alert overlay on the page with a branded header and custom message.
 * Creates and appends a semi-opaque background layer and an alert box containing the Pataverso logo,
 * a heading, and the provided message. Automatically removes the overlay after 2.5 seconds.
 *
 * @function handleAlertOnForm
 * @param {string} message - The text message to display inside the alert.
 * @returns {void}
 */
export const handleAlertOnForm = (message) => {
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

        <h2>ATENCION</h2>
        <p>${message}</p>
    `;

	bgAlert.appendChild(alert);
	body.appendChild(bgAlert);

	setTimeout(() => {
		bgAlert.remove();
	}, 2500);
};

/**
 * @description
 * Displays a branded, full-screen succes alert overlay thanking the user by name
 * and confirming the arrangements will be made for pet pickup. The alert includes
 * the PataVerso logo header, a personalized greeting, and message mentioning the pet name.
 * Automatically dismisses after 4 seconds.
 *
 * @function congratsAlert
 * @param {string} petName - The name of the pet for which pickup is being arranged.
 * @param {string} userName - The name of the user to thank in the alert heading.
 * @returns {void}
 */
export const congratsAlert = (petName, userName) => {
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

        <h2>Gracias ${userName}</h2>
        <p>Nos pondremos en contacto con usted para organizar la recogida de ${petName}</p>
    `;

	bgAlert.appendChild(alert);
	body.appendChild(bgAlert);

	setTimeout(() => {
		bgAlert.remove();
	}, 4000);
};

/**
 * @description
 * Displays a branded, full-screen purchase confirmation modal overlay thanking the user
 * by name, summarizing the purchased product, and explaining that 100% of the purchased price
 * will be used for care and improvement of the pets and facilities. Automatically
 * dismisses after 6 seconds.
 * 
 * @function handleBuyingModal
 * @param {Object} product - The product that was purchased.
 * @param {string} product.nombre - The name of the purchased product.
 * @param {number} product.precio - The price of the purchased product in euros.
 * @param {Object} user - The user who made the purchase.
 * @param {string} user.nombre - The name of the purchasing user.
 * @returns {void}
 */
export const handleBuyingModal = (product, user) => {
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

        <h2>Gracias ${user.nombre} por comprar</h2>
		<p>${product.nombre}</p>
        <p>El 100% del importe de la compra (${product.precio}€) sera destinado para el cuidado y mejora de nuestras mascotas e instalaciones</p>
    `;

	bgAlert.appendChild(alert);
	body.appendChild(bgAlert);

	setTimeout(() => {
		bgAlert.remove();
	}, 6000);
};
