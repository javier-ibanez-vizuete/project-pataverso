export const getProducts = async () => {
    try {
        const response = await fetch('https://petstore.swagger.io/v2/store/inventory');
        const products = await response.json();
        console.log("PRODUCTOS", products);
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {

})