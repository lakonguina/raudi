const { Car, Payment } = require('./models/car');
const User = require('./models/user');


/**
 * Creates and synchronizes database tables for User, Car, and Payment models.
 * 
 * This function forces the synchronization of the models, which means it will drop the existing tables and create new ones. This is useful during development or testing but should be used with caution in production environments.
 * 
 * @async
 * @function create
 * @returns {Promise<void>} Returns a promise that resolves when the synchronization is complete.
 * @throws {Error} Throws an error if there is an issue with the synchronization of the models.
 */
async function create() {
	try {
		await User.sync({ force: true });
		await Car.sync({ force: true });
		await Payment.sync({ force: true });
	} catch (error) {
		console.error(error);
	};
}

create();
