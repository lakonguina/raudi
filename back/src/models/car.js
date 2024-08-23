const { DataTypes } = require('sequelize');
const sequelize = require('../database');


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
