/**
 * @description
 * Initializes a floating "back to top" button that appears once the user scrolls
 * past a defined threshold. Appends the button to the document body, toggles its
 * visibility based on the scroll position, and smoothly scrolls the window to the top
 * when clicked.
 *
 * @dependencies
 * - DOM:
 *   • `<body>` – container to which the button is appended.
 * - CSS classes:
 *   • `.btn-back-to-top` – base styling for the button (size, position, hidden state).
 *   • `.go-up-button`    – modifier class applied when the button should be visible.
 * - Image assets (located under `/media/icons/icon-scroll-up/`):
 *   • `icon-scroll-up-200w.avif`
 *   • `icon-scroll-up-200w.webp`
 *   • `icon-scroll-up-200w.png`
 *
 * @function floatingButton
 * @returns {void}
 */
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
