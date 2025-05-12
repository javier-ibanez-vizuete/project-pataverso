export const createSponsorModal = (animalName) => {
	const body = document.querySelector("body");

	const bgModal = document.createElement("div");
	bgModal.classList.add("bg-modal");

	const modal = document.createElement("div");
	modal.classList.add("modal");

    

	bgModal.append(modal);
	body.append(bgModal);
};
