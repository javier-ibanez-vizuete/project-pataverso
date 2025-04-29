export const getDataFromStorage = (key) => {
	const data = localStorage.getItem(key);

	if (!data) return null; // SI NO HAY NADA EN LOCALSTORAGE RETURNA NULL

	try {
		const parsed = JSON.parse(data);
		if (typeof parsed === "object" && parsed !== null || typeof parsed === "boolean" && parsed !== null) {
			return parsed; // SI ES UN OBJETO/ARRAY RETURNA EL MISMO (OBJETO/ARRAY)
		}
		return data; // POR SI ACASO 'NO DEBERIA DE SER USADO'
	} catch (error) {
		return data; // SI ES UNA STRING RETORNA SOLO 'DATA'
	}
};

export const saveDataInStorage = (key, data) => {
	if (typeof data === "string") {
		localStorage.setItem(key, data);
	}
	if (typeof data !== "string") {
		localStorage.setItem(key, JSON.stringify(data));
	}
};