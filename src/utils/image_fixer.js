/**
 * @description
 * Attaches error handlers to all `<img>` elements on the page to provide a fallback
 * image in case the original source fails to load. For images within `<picture>` elements,
 * it also removes all `<source>` children to prevent repeated load attempts.
*
* @dependencies
* - A global fallback image located at `/media/pictures/image-error/image-error.png`.
* - `<img>` and optional `<picture>` elements present in the DOM.
*
 * @function imageFixer
 * @returns {void}
 */
export const imageFixer = () => {
	const fallback = "/media/pictures/image-error/image-error.png";
	const imgs = document.querySelectorAll("img");

	if (!imgs.length) {
		console.error("No se encontraron imgs");
		return;
	}

	imgs.forEach((img) => {
		// Manejador de error
		const onError = () => {
			if (img.src.endsWith("image-error.png")) {
				img.removeEventListener("error", onError);
				return;
			}

			const picture = img.parentElement;
			if (picture && picture.tagName === "PICTURE") {
				picture.querySelectorAll("source").forEach((src) => src.remove());
			}

			img.src = fallback;
			img.removeEventListener("error", onError);
		};
		img.addEventListener("error", onError);
		if (img.complete && img.naturalWidth === 0) {
			onError();
		}
	});
};
