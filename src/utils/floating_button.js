export const floatingButton = () => {
	const body = document.querySelector("body");

	const btnGoUp = document.createElement("button");
	btnGoUp.classList.add("btn-back-to-top");
	btnGoUp.innerHTML = `
    		<img src="/media/pictures/image-bond-scroll.svg" class="svgIcon">
`;
	body.appendChild(btnGoUp);

	window.addEventListener("scroll", () => {
		if (window.scrollY > 800) {
			btnGoUp.classList.add("go-up-button");
		}
		if (window.scrollY <= 800) {
			btnGoUp.classList.remove("go-up-button");
		}
	});

	btnGoUp.addEventListener("click", () => {
		window.scrollTo(0, 0);
	});
};
