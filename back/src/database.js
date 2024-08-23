const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('database.db', null, null, {
	dialect: 'sqlite',
	storage: './database.db',
});


sequelize.authenticate().then(() => {
	console.log('Connexion à la base de données établie.');
}).catch(error => {
	console.error(error);
});


module.exports = sequelize;
