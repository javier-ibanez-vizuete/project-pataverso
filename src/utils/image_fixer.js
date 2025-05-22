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
