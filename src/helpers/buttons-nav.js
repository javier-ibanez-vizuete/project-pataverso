export const openMobileNav = () => {
	const btnBurgerMenu = document.querySelector(".image-burger-menu-container");
	const btnCloseMobileNav = document.querySelector(".btn-closing-mobile-nav");
	const mobileNav = document.querySelector("#mobile-navigator");

	btnBurgerMenu.addEventListener("click", () => {
        console.log("HACIENDO CLICK EN EL MENU HAMBURGUESA");
		mobileNav.classList.toggle("pop-up-mobile-nav");
	});

	btnCloseMobileNav.addEventListener("click", () => {
		mobileNav.classList.toggle("pop-up-mobile-nav");
	});
};
