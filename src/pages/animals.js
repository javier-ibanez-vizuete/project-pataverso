import { openMobileNav, linksInteraction } from "../helpers/buttons-nav.js"
import { getDataFromStorage, saveDataInStorage } from "../helpers/storage.js";
import { sendingAFetch } from "../utils/fetchs.js";

export const animals = [];

let animal = "perro";

if (getDataFromStorage("animalFetch")) {
    animal = getDataFromStorage("animalFetch");
}

if (!getDataFromStorage("animalFetch")) {
    saveDataInStorage("animalFetch", animal)
}

export const renderAnimal = async (animal) => {
await sendingAFetch(animal);
}

document.addEventListener("DOMContentLoaded", () => {
    renderAnimal(animal);
    linksInteraction();
    openMobileNav();
})