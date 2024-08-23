const Car = require('../models/car');


async function cars(req, res) {
	const cars = await Car.findAll();
	res.json({ car: cars});
}


async function createCar(req, res) {
	const { name, gas, doors, places, height, length } = req.body;
	try {
		const car = await Car.create({
			name:name,
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


module.exports = { cars, createCar };

