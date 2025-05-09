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
            <input type="text" id="input-adopt-form-name" name="input-adopt-form-name" placeholder="Introduce tu nombre completo" minlength="8" maxlength="20" required></input>
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
        
        </div>
    </form>
    `;

	bgModal.append(modal);

	body.append(bgModal);
};
