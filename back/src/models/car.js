const { DataTypes } = require('sequelize');
const sequelize = require('../database');


/**
 * Represents a car model in the database.
 * 
 * @typedef {Object} Car
 * @property {number} id - The unique identifier for the car.
 * @property {string} name - The name of the car.
 * @property {number} price - The price of the car.
 * @property {string} gas - The type of gas the car uses.
 * @property {number} doors - The number of doors the car has.
 * @property {number} places - The number of places the car can accommodate.
 * @property {number} height - The height of the car.
 * @property {number} length - The length of the car.
 */
const Car = sequelize.define('cars', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	gas: {
		type: DataTypes.STRING,
		allowNull: false
	},
	doors: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	places: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	height: {
		type: DataTypes.FLOAT,
		allownull: false
	},
	length: {
		type: DataTypes.FLOAT,
		allownull: false
	}
});


/**
 * Represents a payment model in the database.
 * 
 * @typedef {Object} Payment
 * @property {number} id - The unique identifier for the payment.
 * @property {number} idCar - The ID of the car associated with the payment.
 * @property {number} idUser - The ID of the user who made the payment.
 * @property {number} amount - The amount of the payment.
 * @property {boolean} automatic - Whether the payment was made automatically.
 * @property {boolean} airConditioning - Whether the payment includes air conditioning.
 * @property {Date} date - The date the payment was made.
 */
const Payment = sequelize.define('payments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
	idCar: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'cars',
			key: 'id',
		},
	},
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
	automatic: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	},
	airConditioning: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	},
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});


module.exports = {Car, Payment};
