const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const User = require('../models/user');


async function getToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);}
            req.user = user;
            next();
        });
    }
    next()
}

async function isAdmin(req, res, next) {
    const token = req.headers['authorization'];
    if (token == null) {
        return res.sendStatus(401);}
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);}
        req.user = user;
    });
	let dbUser = await User.findOne({ email: req.user.email })
	if (dbUser.role == 'admin') {
		next();
	} else {
		return res.sendStatus(403);
	}
};

function authenticate(req, res, next) {
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


module.exports = {authenticate, isAdmin, getToken};

