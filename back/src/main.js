const express = require('express');
const cors = require('cors');

const {authenticate, isAdmin, getToken} = require('./middlewares/authenticate');

const {register, login, info} = require('./controllers/user');
const {cars, createCar, payCar} = require('./controllers/car');


const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());
app.post('/register', register);
app.post('/login', login);
app.get('/info', authenticate, info);
app.get('/cars', cars);
app.post('/create/car', isAdmin, createCar);
app.post('/pay/car', getToken, payCar);
app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`);});
