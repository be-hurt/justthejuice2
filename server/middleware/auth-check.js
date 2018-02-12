const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../../credentials');

//use authchecker middleware function
module.exports = (req, res, next) => {
	if (!req.headers.authorization) {
		//user is not authorized
		return res.status(401).end();
	}

	//get the last part from an authorization header string
	const token = req.headers.authorization.split(' ')[1];

	//decode the token using the secret key-phrase we set
	return jwt.verify(token, config.jwtSecret, (err, decoded) => {
		//401 is unauthorized status
		if(err) {
			return res.status(401).end();
		}

		const userId = decoded.sub;

		//check if user exists
		return User.findById(userId, (userErr, user) => {
			if (userErr || !user) {
				return res.status(401).end();
			}

			return next();
		});
	});
};