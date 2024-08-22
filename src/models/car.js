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
	},
});


module.exports = Car;
