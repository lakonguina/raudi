const Car = require('../models/car');

async function cars(req, res) {
	const cars = await Car.findAll();
	res.json({ car: cars});
}

module.exports = { cars };
