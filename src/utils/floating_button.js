export const floatingButton = () => {
	const body = document.querySelector("body");

	const btnGoUp = document.createElement("button");
	btnGoUp.classList.add("btn-back-to-top");
	btnGoUp.innerHTML = `
		<picture>
			<source srcset="/media/pictures/image-bond-scroll/image-bond-scroll-200w.avid" type="image/avid">
			<source srcset="/media/pictures/image-bond-scroll/image-bond-scroll-200w.webp" type="image/webp">
			<source srcset="/media/pictures/image-bond-scroll/image-bond-scroll-200w.png" type="image/png">
    		<img src="/media/pictures/image-bond-scroll/image-bond-scroll.png" class="svgIcon" />
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
		window.scrollTo(0, 0);
	});
};
