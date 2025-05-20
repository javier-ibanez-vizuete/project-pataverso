/**
 * Retrieves and parses a vlaue from localStorage by key.
 * 
 * This function attemps to read a string value from localStorage. If no value
 * is found, it returns null. It then tries to JSON-parse the string:
 *   - If parsing yields an object, array, or boolean, that value is returned.
 *   - If parsing fails (with string), the raw string is returned.
 * 
 * @function getDataFromStorage
 * @param {string} key - The localStorage key to retrieve.
 * @returns {*} The parsed value (object, array, boolean) or raw string, or null if not present.
 */
export const getDataFromStorage = (key) => {
	const data = localStorage.getItem(key);

	if (!data) return null; // SI NO HAY NADA EN LOCALSTORAGE RETURNA NULL

	try {
		const parsed = JSON.parse(data);
		if ((typeof parsed === "object" && parsed !== null) || (typeof parsed === "boolean" && parsed !== null)) {
			return parsed; // SI ES UN OBJETO/ARRAY RETURNA EL MISMO (OBJETO/ARRAY)
		}
		return data; // POR SI ACASO 'NO DEBERIA DE SER USADO'
	} catch (error) {
		return data; // SI ES UNA STRING RETORNA SOLO 'DATA'
	}
};

/**
 * Saves a value under the specified key in localStorage.
 * 
 * If the data is a string, it is stored directly. Otherwise, the data
 * is serialized to JSON before storage.
 * 
 * @function saveDataInStorage
 * @param {string} key - The key under which to store the data.
 * @param {*} data -The data to store; non-string types will be JSON-stringified.
 */
export const saveDataInStorage = (key, data) => {
	if (typeof data === "string") {
		localStorage.setItem(key, data);
	}
	if (typeof data !== "string") {
		localStorage.setItem(key, JSON.stringify(data));
	}
};

export const deleteLocalStorage = () => {
	localStorage.clear();
	window.location.reload();
};

/**
 * Removes an item from localStorage if it exists.
 *
 * This function checks for the presence of a value under the given key in localStorage and deletes it if found.
 *
 * @function removeFromStorage
 * @param {string} key - The localstorage key to remove.
 * @returns {null} returns null if the key does not exist; otherwise, nothing.
 */
export const removeFromStorage = (key) => {
	const data = localStorage.getItem(key);

	if (!data) return null;

	if (data) localStorage.removeItem(key);
};
