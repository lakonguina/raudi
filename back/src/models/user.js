const { DataTypes } = require('sequelize');

const sequelize = require('../database');


/**
 * Represents a user model in the database.
 * 
 * @typedef {Object} User
 * @property {number} id - The unique identifier for the user, auto-incremented.
 * @property {string} username - The username of the user. This field is required.
 * @property {string} email - The email address of the user. This field is required.
 * @property {string} password - The hashed password of the user. This field is required.
 * @property {string} role - The role of the user, which can be 'user', 'admin', or 'comptable'. Defaults to 'user'.
 */
const User = sequelize.define('users', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	role: {
        type: DataTypes.ENUM('user', 'admin', 'comptable'),
        allowNull: false,
        defaultValue: 'user'
    }
});


module.exports = User;
