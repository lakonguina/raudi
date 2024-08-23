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
 * Represents a car options model in the database.
 * 
 * @typedef {Object} CarOptions
 * @property {number} id - The unique identifier for the car option, auto-incremented.
 * @property {number} idCar - The ID of the car associated with this car option.
 * @property {string} name - The name of the car option.
 * @property {number} price - The price of the car option.
 */
const CarOptions = sequelize.define('car_options', {
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
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
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
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});


/**
 * Represents a payment options model in the database.
 * 
 * @typedef {Object} PaymentOptions
 * @property {number} id - The unique identifier for the payment option, auto-incremented.
 * @property {number} idCarOptions - The ID of the car option associated with the payment option.
 * @property {number} idPayment - The ID of the payment associated with this payment option.
 */
const PaymentOptions = sequelize.define('payments_options', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
	idCarOptions: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'cars_options',
			key: 'id',
		},
	},
	idPayment: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'payments',
			key: 'id',
		},
	},
});


module.exports = {Car, Payment};
