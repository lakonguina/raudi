const express = require('express');
const cors = require('cors');

const {register, login} = require('./controllers/user');
const {cars} = require('./controllers/car');


const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());
app.post('/register', register);
app.post('/login', login);
app.get('/cars', cars);
app.listen(port, ()=>{console.log(`Serveur démarré sur http://localhost:${port}`);});
