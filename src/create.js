const car = require('./models/car');
const user = require('./models/user');


async function create() {
	try {
		await car.sync({ force: true });
		await user.sync({ force: true });
	} catch (error) {
		console.error(error);
	};
}

create();
