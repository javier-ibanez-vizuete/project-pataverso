import { getDataFromStorage } from "../helpers/storage.js";

/**
 * Verifies session status and attaches a logout listener.
 *
 * This function check if a user session is open by reading from local storage.
 *  - If no session is active, it redirects to the login page.
 *  - If logout button or current user data is missing, it logs and error.
 *  - Otherwise, it binds a click handler to the logout button that:
 *    1. Sets the session flag to false.
 *    2. Removes the current user from storage.
 *    3. Reloads the page.
 *
 * @function handleUserSesion
 */
export const handleUserSesion = () => {
	const sesionOpen = getDataFromStorage("sesionIsOpen");
	if (!sesionOpen) {
		window.location.href = "/index.html";
		return;
	}
};
