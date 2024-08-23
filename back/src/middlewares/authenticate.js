const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const User = require('../models/user');


const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token == null) {
        return res.sendStatus(401);}
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);}
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token == null) {
        return res.sendStatus(401);}
    	jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);}
        req.user = user;
		const dbUser = await User.findOne({ email: user.email })
		if (dbUser.role == 'admin') {
			next();
		} else {
			return res.sendStatus(403);
		}
    });

};

module.exports = {authenticate, isAdmin};

