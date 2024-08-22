const Car = require('./models/car');


async function _import() {
	try {
		const cars = [
			{ name: 'Raudi R1', gas: 'Hybrid', doors: 4, places: 5, height: 1.49, length: 4.54 },
			{ name: 'Raudi R2', gas: 'Electric', doors: 4, places: 5, height: 1.44, length: 4.97 },
			{ name: 'Raudi Famille', gas: 'Petrol', doors: 4, places: 5, height: 1.41, length: 4.63 }
		];
		await Car.bulkCreate(cars);
	} catch (error) {
		console.error(error);
	}
}

_import();
