const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const User = require('../models/user');


/**
 * Middleware to retrieve and verify the JWT token from the request headers.
 * 
 * This function checks if the `Authorization` header contains a token. If the token is present and valid, it attaches the user information to the request object.
 * If the token is missing or invalid, the request proceeds without setting the user (i.e., `req.user` will not be set).
 * 
 * This middleware is used to handle token-based authentication.
 * 
 * @param {Object} req - The request object. It is expected to have an `Authorization` header.
 * @param {Object} res - The response object. It is used to send the response if the token is invalid.
 * @param {Function} next - The callback function to pass control to the next middleware or route handler.
 */
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


/**
 * Middleware to check if the user has admin privileges.
 * 
 * This function verifies the JWT token from the request headers and checks the user's role from the database.
 * If the token is valid and the user has the 'admin' role, it allows the request to proceed. Otherwise, it sends a `403 Forbidden` status.
 * 
 * @param {Object} req - The request object. It is expected to have an `Authorization` header.
 * @param {Object} res - The response object. It is used to send a `403 Forbidden` response if the user is not an admin.
 * @param {Function} next - The callback function to pass control to the next middleware or route handler if the user is an admin.
 * @throws {Error} Throws an error if there is an issue with the database query.
 */
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


/**
 * Middleware to authenticate a user by verifying the JWT token.
 * 
 * This function checks the `Authorization` header for a JWT token, verifies its validity, and attaches the user information to the request object.
 * If the token is invalid or not present, it sends a `401 Unauthorized` or `403 Forbidden` response.
 * 
 * @param {Object} req - The request object. It is expected to have an `Authorization` header.
 * @param {Object} res - The response object. It is used to send a `401 Unauthorized` or `403 Forbidden` response if the token is missing or invalid.
 * @param {Function} next - The callback function to pass control to the next middleware or route handler if the token is valid.
 */
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
