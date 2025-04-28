// var pf = new petfinder.Client({
// 	apiKey: "Z9dKanxKljx0qyg74NrdG0JWvmV0z1XKEzbqEBfibH06EPh8hC",
// 	secret: "QVxf7S7BZa0qAFtzslN4dYOVOFzaYteZHFKSpyDJ",
// });

// let animals = [];

// pf.animal
// 	.search({type: "cat"})
// 	.then(function (response) {
// 		console.log(response);
// 		animals = response.data.animals
// 		// Do something with `response.data.animals`
// 	})
// 	.catch(function (error) {
// 	});

const pf = new petfinder.Client({
	apiKey: "Z9dKanxKljx0qyg74NrdG0JWvmV0z1XKEzbqEBfibH06EPh8hC",
	secret: "QVxf7S7BZa0qAFtzslN4dYOVOFzaYteZHFKSpyDJ",
});

const tryingstuff = async (animal) => {
	const response = await pf.animal.search({ type: animal.trim() });
	const data = response.data.animals[0];
	console.log("Esto vale el fetch actualizado", response);
	console.log("esto vale data", data);
};

// tryingstuff("cat");

// revisar video RICKY MORTY (clase 22 asyncronia - promesa - peticiones)
// const waitForAnswer = async () => {
// 	response = await pf.animal.search({type: "cat"}).then(function (response) {
// 		return response;
// 	})
// 	animals = await response.data.animals;
// 	console.log("esto vale response", animals);
// }

// waitForAnswer();

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
