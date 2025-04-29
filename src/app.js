
const sendingAFetch = async () => {
	try {
		const response = await fetch("https://huachitos.cl/api/animales");
		if (!response.ok) {
			throw new Error("NEW ERROR");
		}
		const data = await response.json();
		const animales = data.data;
		animales.forEach((animal) => {
			console.log(animal.tipo);
		});
	} catch (error) {
		console.log("error.message", error);
	}
};

sendingAFetch();

console.log("hola");