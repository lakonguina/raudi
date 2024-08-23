const Car = require('./models/car');


async function _import() {
	try {
		const cars = [
			{ name: 'Raudi R1', price: 10000.50, gas: 'Hybrid', doors: 4, places: 5, height: 1.49, length: 4.54 },
			{ name: 'Raudi R2', gas: 'Electric', price: 25999.99, doors: 4, places: 5, height: 1.44, length: 4.97 },
			{ name: 'Raudi Famille', gas: 'Petrol', price: 15000, doors: 4, places: 5, height: 1.41, length: 4.63 }
		];
		await Car.bulkCreate(cars);
	} catch (error) {
		console.error(error);
	}
}

_import();
