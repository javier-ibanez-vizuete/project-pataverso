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

    bgAlert.appendChild(alert)
    body.appendChild(bgAlert);

    setTimeout(() => {
        bgAlert.remove();
    }, 2500);
};
