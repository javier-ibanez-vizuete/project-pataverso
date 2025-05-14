import { getDataFromStorage } from "../helpers/storage.js";

document.addEventListener("DOMContentLoaded", () => {
    const nombre = document.getElementById("nombre");
    console.log(nombre);
    nombre.textContent = getDataFromStorage("currentUser").nombre
})