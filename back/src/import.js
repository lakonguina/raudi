const bcrypt = require('bcrypt');

const {Car, Payment} = require('./models/car');
const User = require('./models/user');


/**
 * Imports initial data into the database.
 * 
 * This function creates initial users and cars by hashing user passwords and
 * then inserting them into the database using bulkCreate for efficiency.
 * 
 * The users and cars data are defined within the function, and errors during
 * the process are logged to the console.
 * 
 * @async
 * @function _import
 * @returns {Promise<void>} Returns a promise that resolves when the import is complete.
 */
async function _import() {
	try {
		const users = [
			{username: 'admin', email: 'admin@raudi.com', role: "admin", password: await bcrypt.hash('123456', 10)},
			{username: 'accountant', email: 'accountant@raudi.com', password: await bcrypt.hash('123456', 10)},
		]
		const cars = [
			{ name: 'Raudi R1', price: 10000.50, gas: 'Hybrid', doors: 4, places: 5, height: 1.49, length: 4.54 },
			{ name: 'Raudi R2', gas: 'Electric', price: 25999.99, doors: 4, places: 5, height: 1.44, length: 4.97 },
			{ name: 'Raudi Famille', gas: 'Petrol', price: 15000, doors: 4, places: 5, height: 1.41, length: 4.63 }
		];
		await Car.bulkCreate(cars);
		await User.bulkCreate(users);
	} catch (error) {
		console.error(error);
	}
}

_import();
