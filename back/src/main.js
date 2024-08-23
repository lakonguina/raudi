const express = require('express');
const cors = require('cors');

const authenticate = require('./middlewares/authenticate');

const {register, login, info} = require('./controllers/user');
const {cars, createCar} = require('./controllers/car');


const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());
app.post('/register', register);
app.post('/login', login);
app.get('/info', authenticate, info);
app.get('/cars', cars);
app.post('/create/car', isAdmin, createCar);
app.listen(port, () => {
	console.log(`Serveur démarré sur http://localhost:${port}`);});
