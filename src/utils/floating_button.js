export const floatingButton = () => {
	const body = document.querySelector("body");

	const btnGoUp = document.createElement("button");
	btnGoUp.classList.add("btn-back-to-top");
	btnGoUp.innerHTML = `
		<picture>
			<source srcset="/media/icons/icon-scroll-up/icon-scroll-up-200w.avif" type="image/avif">
			<source srcset="/media/icons/icon-scroll-up/icon-scroll-up-200w.webp" type="image/webp">
			<source srcset="/media/icons/icon-scroll-up/icon-scroll-up-200w.png" type="image/png">
    		<img src="/media/icons/icon-scroll-up/icon-scroll-up.png" class="svgIcon"/>
		</picture>
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
		window.scrollTo({ top: 0, behavior: "smooth" });
	});
};
