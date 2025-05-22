import { petsObjects } from "../components/pets_objects.js";
import { handleBuyingModal } from "../helpers/alerts.js";
import { linksInteraction, openMobileNav } from "../helpers/buttons_nav.js";
import { getDataFromStorage, saveDataInStorage } from "../helpers/storage.js";
import { imageFixer } from "../utils/image_fixer.js";

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
		const productSelected = userProducts.filter((productbought) => productbought.id === product.id);
		productSelected.quantity += 1;
		saveDataInStorage("usersData", users);
		handleBuyingModal(product, user);
		console.log("Que vale userProduct despues de comprar", userProducts);
		return;
	});

	infoContainer.append(detailsContainer, btnBuyProduct);

	return infoContainer;
};

const createProductImage = (image) => {
	const imageContainer = document.createElement("div");
	imageContainer.classList.add("img-product-container");

	const img = document.createElement("img");
	img.setAttribute("loading", "lazy");
	img.src = image;

	imageContainer.appendChild(img);

	return imageContainer;
};

const createProductCard = (product) => {
	const cardContainer = document.createElement("div");
	cardContainer.classList.add("product-card");

	const { imagen } = product;
	const imageContainer = createProductImage(imagen);

	const infoContainer = createInfoContainer(product);

	cardContainer.append(imageContainer, infoContainer);

	return cardContainer;
};

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
	if (currentSearch) {
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

const handleSearch = () => {
    const select = document.querySelector("#select-filter-product-type")
    const inputSearch = document.querySelector("#input-filter-product-name");

    select.addEventListener("change", () => {
        renderProducts(inputSearch.value);
        return
    })

    inputSearch.addEventListener("keyup", (event) => {
        const search = event.target.value;
        renderProducts(search);
    })
}

document.addEventListener("DOMContentLoaded", () => {
	imageFixer();
	handleOptionsOnFilter();
	openMobileNav();
	linksInteraction();
	renderProducts();

    handleSearch();
});
