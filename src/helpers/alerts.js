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
