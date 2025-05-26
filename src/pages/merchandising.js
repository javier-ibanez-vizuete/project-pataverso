import { petsObjects } from "../components/pets_objects.js";
import { handleBuyingModal } from "../helpers/alerts.js";
import { linksInteraction, logoutprofile, openMobileNav } from "../helpers/buttons_nav.js";
import { getDataFromStorage, saveDataInStorage } from "../helpers/storage.js";
import { floatingButton } from "../utils/floating_button.js";
import { imageFixer } from "../utils/image_fixer.js";

/**
 * @description
 * Creates and returns a DOM element containing detailed product information,
 * including name, category, and price. The returned container is structured
 * with semantic headings and spans for styling and accesibility.
 *
 * @function createDetailsContainer
 * @param {string} name - The name of the product.
 * @param {string} category - The category to which the product belongs.
 * @param {number} price - The price of the product in euros.
 * @returns {HTMLDivElement} A '<div>' element with the class 'details-product-container' containing:
 *   - An '<h4>' with class 'product-name' for the product.
 *   - An '<h4>' with a nested '<span>' with the class 'span-product-category' displaying the category.
 *   - An '<h4>' with a nested '<span>' with the class 'span-product-price' displaying the price suffixed with '€'.
 */
const createDetailsContainer = (name, category, price) => {
	const detailsContainer = document.createElement("div");
	detailsContainer.classList.add("details-product-container");

	const h4Name = document.createElement("h4");
	h4Name.classList.add("product-name");
	h4Name.textContent = name;

	const h4Category = document.createElement("h4");
	h4Category.textContent = "Categoria:";
	const spanCategory = document.createElement("span");
	spanCategory.classList.add("span-product-category");
	spanCategory.textContent = category;
	h4Category.appendChild(spanCategory);

	const h4Price = document.createElement("h4");
	h4Price.textContent = "Precio:";
	const spanPrice = document.createElement("span");
	spanPrice.classList.add("span-product-price");
	spanPrice.textContent = `${price}€`;
	h4Price.appendChild(spanPrice);

	detailsContainer.append(h4Name, h4Category, h4Price);

	return detailsContainer;
};

/**
 * @description
 * Constructs and returns a product info container including details and a purchase button.
 *  - Retrieves all users and the current user from localStorage.
 *  - Displays product name, category, and price via 'createDetailsContainer'.
 *  - Configures a 'buy' button that:
 *    1. changes to 'buy Again' if the product was previously purchased.
 *    2. Adds the product to the user's 'products_bought' array (initially with quantity 1) or
 *       increments its quantity if already present.
 *    3. Persists updates to localStorage and triggers the 'handleBuyingModal'.
 *
 * @function createInfoContainer
 * @param {Object} product - The Product Object from the Array
 * @param {string} product.id - Unique identifier for the product.
 * @param {string} product.nombre - Product name.
 * @param {string} product.tipo - Product Category.
 * @param {number} product.precio - Product price.
 * @returns {HTMLDivElement} A '<div>' with class 'info-product-container' containing:
 *   - A details section (from 'createDetailsContainer').
 *   - A purchase '<button>' with class 'btn-buy-product-btn-style'.
 */
const createInfoContainer = (product) => {
	const users = getDataFromStorage("usersData");
	const currentUser = getDataFromStorage("currentUser");
	const infoContainer = document.createElement("div");
	infoContainer.classList.add("info-product-container");

	const { nombre, tipo, precio } = product;
	const detailsContainer = createDetailsContainer(nombre, tipo, precio);

	const btnBuyProduct = document.createElement("button");
	btnBuyProduct.classList.add("btn-buy-product", "btn-style");
	btnBuyProduct.textContent = "Comprar";
	if (!users.length) {
		console.error("No hemos encontrado usersData en localStorage");
		infoContainer.append(detailsContainer, btnBuyProduct);
		return infoContainer;
	}
	if (!currentUser) {
		console.error("No hemos encontrado currentUser en localStorage");
		infoContainer.append(detailsContainer, btnBuyProduct);
		return infoContainer;
	}
	const userIndex = users.findIndex((user) => user.id === currentUser.id);
	if (userIndex === -1) {
		console.error("No hemos encontrado a currentUser dentro de users");
		infoContainer.append(detailsContainer, btnBuyProduct);
		return infoContainer;
	}
	const user = users[userIndex];
	console.log("user", user);
	const userProducts = user.products_bought;
	const isProductBought = userProducts.find((productBought) => productBought.id === product.id);
	if (isProductBought) {
		btnBuyProduct.textContent = "Volver a comprar";
	}
	console.log("userProducts antes de comprar", userProducts);
	btnBuyProduct.addEventListener("click", () => {
		const isProductBought = userProducts.find((productBought) => productBought.id === product.id);
		if (!isProductBought) {
			userProducts.push({ ...product, quantity: 1 });
			saveDataInStorage("usersData", users);
			btnBuyProduct.textContent = "Volver a comprar";
			handleBuyingModal(product, user);
			return;
		}
		const productSelectedIndex = userProducts.findIndex((productbought) => productbought.id === product.id);
		if (productSelectedIndex === -1) {
			console.error("No hemos encontrado el producto Por ID");
			return;
		}
		userProducts[productSelectedIndex].quantity += 1;
		saveDataInStorage("usersData", users);
		handleBuyingModal(product, user);
		console.log("Que vale userProduct despues de comprar", userProducts);
		return;
	});

	infoContainer.append(detailsContainer, btnBuyProduct);

	return infoContainer;
};

/**
 * @description
 * Creates and returns a container `<div>` element wrapping a lazily-loaded product image.
 *
 * @function createProductImage
 * @param {string} image - The URL source of the product image.
 * @returns {HTMLDivElement} A `<div>` element with class `img-product-container` containing:
 *  - An `<img>` element with `loading="lazy"` and `src` set to the provided URL.
 */
const createProductImage = (image) => {
	const imageContainer = document.createElement("div");
	imageContainer.classList.add("img-product-container");

	const img = document.createElement("img");
	img.setAttribute("loading", "lazy");
	img.src = image;

	imageContainer.appendChild(img);

	return imageContainer;
};

/**
 * @description
 * Builds and returns a complete product card element composed of an image section and
 * an information section. Utilizes helper functions to construct each sub-component.
 *
 * @function createProductCard
 * @param {Object} product
 * @param {string} product.imagen - URL of the product image.
 * @param {string} product.id     - Unique identifier for the product.
 * @param {string} product.nombre - Name of the product.
 * @param {string} product.tipo   - Category/type of the product.
 * @param {number} product.precio - Price of the product in euros.
 * @returns {HTMLDivElement} A `<div>` element with class `product-card` containing:
 *  1. An image container (`.img-product-container`) with a lazy-loaded `<img>`.
 *  2. An info container (`.info-product-container`) with details and purchase logic.
 */
const createProductCard = (product) => {
	const cardContainer = document.createElement("div");
	cardContainer.classList.add("product-card");

	const { imagen } = product;
	const imageContainer = createProductImage(imagen);

	const infoContainer = createInfoContainer(product);

	cardContainer.append(imageContainer, infoContainer);

	return cardContainer;
};

/**
 * @description
 * Populates a `<select>` element with unique product categories derived from the global `petsObjects` array.
 * Clears any existing options and inserts a default placeholder, then adds one `<option>` per distinct `tipo`.
 *
 * @function handleOptionsOnFilter
 * @param {void}
 * @returns {void}
 */
const handleOptionsOnFilter = () => {
	const select = document.querySelector("#select-filter-product-type");
	const Objects = petsObjects;

	select.innerHTML = "";

	const defaultOption = document.createElement("option");
	defaultOption.disabled = true;
	defaultOption.selected = true;
	defaultOption.textContent = "Elige una Categoria";
	select.appendChild(defaultOption);

	Objects.forEach((object, index) => {
		if (object.tipo && !Array.from(select.options).some((option) => option.value === object.tipo)) {
			const option = document.createElement("option");
			option.value = object.tipo;
			option.textContent = object.tipo.toUpperCase();
			select.appendChild(option);
		}
	});
};

/**
 * @description
 * Renders product cards in the `.products-container` element based on an optional search term
 * and the selected category filter from the `<select>` element with ID `select-filter-product-type`.
 * If no products are found after filtering, an appropriate message is displayed.
 *
 * @function renderProducts
 * @param {string} [currentSearch=""] - Optional search query to filter products by name.
 * @returns {Promise<void>}
 */
const renderProducts = async (currentSearch = "") => {
	const productsContainer = document.querySelector(".products-container");
	productsContainer.innerHTML = "";
	const search = currentSearch.toLowerCase().trim();
	const select = document.querySelector("#select-filter-product-type");
	const selectValue = select.value.toLowerCase().trim();
	let products = petsObjects;
	if (!products.length) {
		productsContainer.innerHTML = `
        <h4>Actualmente no tenemos Productos Disponibles</h4>
        `;
		return;
	}
	if (search) {
		products = petsObjects.filter((product) => product.nombre.toLowerCase().includes(search));
	}
	if (select.value !== select.options[0].value) {
		products = products.filter((product) => product.tipo.toLowerCase() === selectValue);
	}
	if (!products.length) {
		productsContainer.innerHTML = `
        <h4>NO EXISTEN COINCIDENCIAS EN SU BUSQUEDA</h4>
        `;
		return;
	}
	products.forEach((product) => {
		const productCard = createProductCard(product);
		productsContainer.appendChild(productCard);
	});
};

/**
 * @description
 * Sets up event listeners on the product filter form inputs to dynamically update
 * the displayed product list based on the user's search query and category selection.
 * When the user types in the search input or changes the category select, the product list is filtered accordingly.
 *
 * @function handleSearch
 * @returns {void}
 */
const handleSearch = () => {
	const select = document.querySelector("#select-filter-product-type");
	const inputSearch = document.querySelector("#input-filter-product-name");

	select.addEventListener("change", () => {
		renderProducts(inputSearch.value);
		return;
	});

	inputSearch.addEventListener("keyup", (event) => {
		const search = event.target.value;
		renderProducts(search);
	});
};

document.addEventListener("DOMContentLoaded", () => {
	imageFixer();
	handleOptionsOnFilter();
	openMobileNav();
	linksInteraction();
	renderProducts();
	logoutprofile();
	handleSearch();
	floatingButton();
});
