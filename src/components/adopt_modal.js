import { getDataFromStorage, removeFromStorage, saveDataInStorage } from "../helpers/storage.js";

const calculateResponse = (animalName) =>
	new Promise((resolve, reject) => {
		const currentUser = getDataFromStorage("currentUser");
		const inputHomeType = document.querySelector("#select-adopt-form-home-type");
		const inputHomeAlone = document.querySelector("#select-adopt-form-home-alone");
		const inputHandleBills = document.querySelector("#select-adopt-form-handle-vet-bills");
		const inputMorePets = document.querySelector("#select-adopt-form-more-pets");
		let pointsCounter = 0;

		if (inputHomeType.value === "flat") {
			pointsCounter += 1;
		}
		if (inputHomeType.value === "house") {
			pointsCounter += 2;
		}
		if (inputHomeType.value === "country-state") {
			pointsCounter += 3;
		}
		if (inputHomeAlone.value === "sometimes") {
			pointsCounter += 1;
		}
		if (inputHomeAlone.value === "almost-never") {
			pointsCounter += 2;
		}
		if (inputMorePets.value === "yes") {
			pointsCounter += 1;
		}
		if (inputHandleBills.value === "no") {
			pointsCounter = 0;
		}
		if (inputHandleBills.value === "yes") {
			pointsCounter += 1;
		}
		if (pointsCounter < 1) {
			reject(
				`${currentUser.nombre} No esta capacitado para la adopcion a traves de Pataverso. Disculpe las molestias`
			);
			return;
		}
		if (pointsCounter >= 1 && pointsCounter < 7) {
			resolve(`Le hemos añadido a la lista de candidatos para la adopcion de ${animalName}.
            Nos pondremos en contacto con usted a traves de la direccion de correo electronico (${currentUser.email}).
            `);
		}
		if (pointsCounter >= 7) {
			resolve(`
				Nos ha encantado el resultado de su formulario ${currentUser.nombre}. Nos pondremos en contacto con usted lo antes posible
			`);
		}
	});

const handleAdoptForm = async (animalName) => {
	const form = document.querySelector(".adopt-form-contaier");
	const currentUser = getDataFromStorage("currentUser");
	const users = getDataFromStorage("usersData");
	const currentUserIndex = users.findIndex((user) => user.email === currentUser.email);
	console.log("¿Que vale currentUserIndex? ", currentUserIndex);

	form.addEventListener("submit", async (event) => {
		const inputHomeType = document.querySelector("#select-adopt-form-home-type");
		const inputHomeAlone = document.querySelector("#select-adopt-form-home-alone");
		const inputHandleBills = document.querySelector("#select-adopt-form-handle-vet-bills");
		const inputMorePets = document.querySelector("#select-adopt-form-more-pets");
		event.preventDefault();

		if (inputHomeType.value === "disabled") {
			alert("Por favor elija un tipo de casa");
			inputHomeType.scrollIntoView({ behavior: "smooth", block: "center" });
			return;
		}
		if (inputHomeAlone.value === "disabled") {
			alert("Necesita elegir cuanto tiempo esta la casa vacia.");
			inputHomeAlone.scrollIntoView({ behavior: "smooth", block: "center" });
			return;
		}
		if (inputHandleBills.value === "disabled") {
			alert("Por favor debe rellenar el campo - Afrontar gastos veterinarios");
			inputHandleBills.scrollIntoView({ behavior: "smooth", block: "center" });
			return;
		}
		if (inputMorePets.value === "disabled") {
			alert("Debe elegir si tiene más mascotas en casa");
			inputMorePets.scrollIntoView({ behavior: "smooth", block: "center" });
			return;
		}
		try {
			const response = await calculateResponse(animalName);
			alert(response);
			window.location.href = "/index.html";
		} catch (error) {
			alert(error);
			users[currentUserIndex].is_banned = true;
			saveDataInStorage("usersData", users);
			saveDataInStorage("sesionIsOpen", false);
			removeFromStorage("currentUser");
			window.location.reload();
		}
	});
};

export const createAdoptModal = (animalName) => {
	const body = document.querySelector("body");

	const bgModal = document.createElement("div");
	bgModal.classList.add("bg-modal");

	const modal = document.createElement("div");
	modal.classList.add("modal");

	modal.innerHTML = `
    <h2>Formulario para la adopcion de ${animalName}</h2>
    <form method="get" class="adopt-form-contaier">
        <div class="input-adopt-container">
            <label for="input-adopt-form-name">Nombre</label>
            <input type="text" id="input-adopt-form-name" name="input-adopt-form-name" placeholder="Introduce tu nombre completo" minlength="8" maxlength="40" required></input>
        </div>
        <div class="input-adopt-container">
            <label for="select-adopt-form-home-type">¿Tipo de vivienda?</label>
            <select id="select-adopt-form-home-type" name="select-adopt-form-home-type" required>
                <option value="disabled" disabled selected>Elige una opción</option>
                <option value="flat">Piso</option>
                <option value="house">Casa</option>
                <option value="country-state">Finca</option>
            </select>
        </div>
        <div class="input-adopt-container">
            <label for="select-adopt-form-home-alone">¿Cuántas horas suele estar la vivienda vacía?</label>
            <select id="select-adopt-form-home-alone" name="select-adopt-form-home-alone" required>
                <option value="disabled" disabled selected>Elige una opción</option>
                <option value="always">Más de 4 horas</option>
                <option value="sometimes">Entre 2 y 4 horas</option>
                <option value="almost-never">Menos de 2 horas</option>
            </select>
        </div>
        <div class="input-adopt-container">
            <label for="select-adopt-form-handle-vet-bills">¿Puedes afrontar gastos veterinarios básicos(vacunas, alimentacion, etc.)?</label>
            <select id="select-adopt-form-handle-vet-bills" name="select-adopt-form-handle-vet-bills" required>
                <option value="disabled" disabled selected>Elige una opción</option>
                <option value="yes">Si</option>
                <option value="no">No</option>
            </select>
        </div>
        <div class="input-adopt-container">
            <label for="select-adopt-form-more-pets">¿Tienes otras mascotas actualmente?</label>
            <select id="select-adopt-form-more-pets" name="select-adopt-form-more-pets" required>
                <option value="disabled" disabled selected>Elige una opción</option>
                <option value="yes">Si</option>
                <option value="no">No</option>
            </select>
        </div>
        <div class="btns-adopt-form-container">
            <button class="btn-apply-adopt-form btn-style">ENVIAR FORMULARIO</button>
            <button class="btn-reject-adopt-form btn-style">CANCELAR FORMULARIO</button>
        </div>
    </form>
    `;

	bgModal.append(modal);
	body.append(bgModal);
	handleAdoptForm(animalName);
};
