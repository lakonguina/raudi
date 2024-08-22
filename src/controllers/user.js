const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const User = require('../models/user');


async function register(req, res) {
	const { username, email, password } = req.body;
	try {
		let dbUser = await User.findOne({where: { username: username}});
		if (dbUser) {
			return res.status(400).json({error: 'Nom déjà utilisé.'});
		}
		dbUser = await User.findOne({ where: { email: email} });
		if (dbUser) {
			return res.status(400).json({error: 'Email déjà utilisé.'});
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			username: username,
			email: email,
			password: hashedPassword});
		return res.status(201).json({
			message: 'Utilisateur crée.',
			user: user });
	} catch (error) {
		return res.status(500).json({ error: error });
	}
};


async function login(req, res) {
	const { email, password } = req.body;
	try {
		let user = await User.findOne({ where: { email: email} });
		if (!user) {
			return res.status(400).json({ message: 'Email invalide.'});}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ message: 'Mot de passe invalide.'});}
		const token = jwt.sign({
			id: user.id,
			username: user.username },
			JWT_SECRET, { expiresIn: '1h' });
		return res.json({ token });
	} catch (error) {
		res.status(500).json({ message: error });
	}
}


module.exports = {register, login};
