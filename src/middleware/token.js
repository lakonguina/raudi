const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');


const authenticateToken = (req, res, next) => {
    const token= req.headers['Authorization'];
    if (token == null) {
        return res.sendStatus(401);}
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);}
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;

