const {Car, Payment} = require('../models/car');


/**
 * Retrieves a list of all cars from the database.
 * 
 * This function fetches all car records and returns them in a JSON response.
 * 
 * @param {Object} _ - The request object (not used in this function).
 * @param {Object} res - The response object used to send the JSON response.
 * @returns {Promise<void>} Returns a promise that resolves when the response is sent.
 */
async function cars(_, res) {
	const cars = await Car.findAll();
	res.json({ car: cars});
}


/**
 * Creates a new car entry in the database.
 * 
 * This function creates a new car record based on the provided details and returns the created car in the response.
 * 
 * Request Body:
 * - name (string): The name of the car.
 * - price (number): The price of the car.
 * - gas (string): The type of gas used by the car.
 * - doors (number): The number of doors on the car.
 * - places (number): The number of places/seats in the car.
 * - height (number): The height of the car.
 * - length (number): The length of the car.
 * 
 * @param {Object} req - The request object containing the car details in `req.body`.
 * @param {Object} res - The response object used to send the JSON response.
 * @returns {Promise<void>} Returns a promise that resolves with a JSON response containing the created car.
 * @throws {Error} Throws an error if there is a problem creating the car.
 */
async function createCar(req, res) {
	const { name, price, gas, doors, places, height, length } = req.body;
	try {
		const car = await Car.create({
			name:name,
			price:price,
			gas:gas,
			doors:doors,
			places:places,
			height:height,
			length:length});
		return res.status(201).json({car: car});
	} catch (error) {
		return res.status(500).json({error: error});
	}
}


/**
 * Processes a payment for a car.
 * 
 * This function handles payment processing based on whether the user is authenticated or not. It calculates the total amount based on optional features and records the payment in the database.
 * 
 * Request Body:
 * - automatic (boolean): Indicates if the payment includes automatic transmission.
 * - conditioning (boolean): Indicates if the payment includes air conditioning.
 * - idCar (number): The ID of the car for which the payment is being made.
 * 
 * @param {Object} req - The request object containing the payment details and optionally authenticated user information.
 * @param {Object} res - The response object used to send the JSON response.
 * @returns {Promise<void>} Returns a promise that resolves with a JSON response indicating the result of the payment.
 * @throws {Error} Throws an error if there is a problem processing the payment or creating the payment record.
 */
async function payCar(req, res) {
	const { automatic, conditioning, idCar} = req.body;
	const car = await Car.findOne({where: {id: idCar}});
	if (req.user) {
		try {
			await Payment.create({
				idCar: idCar,
				amount: car.price
			});
			return res.status(201).json({message: "Paiement effectué."});
		} catch (error) {
			return res.status(500).json({error: error});
		}
	} else {
		try {
			const car = await Car.findOne({where: {id: idCar}});
			let amount = car.price;
			if (automatic) {
				amount += 1000;
			}
			if (conditioning) {
				amount += 500;
			}
			await Payment.create({
				idCar: idCar,
				automatic: automatic,
				amount: amount
			});
			return res.status(201).json({car: car});
		} catch (error) {
			return res.status(500).json({error: error});
		}
	}
}


module.exports = { cars, createCar, payCar };
