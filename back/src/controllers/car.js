const {Car, Payment} = require('../models/car');


async function cars(req, res) {
	const cars = await Car.findAll();
	res.json({ car: cars});
}


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
