

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

    handleAdoptForm();
	bgModal.append(modal);

	body.append(bgModal);
};
