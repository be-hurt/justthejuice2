const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

//return the passport local strategy object
module.exports = new PassportLocalStrategy({
	userNameField: 'name',
	passwordField: 'password',
	session: false,
	passReqToCallback: true
}, (req, name, email, password, done) => {
	const userData = {
		name: req.body.name.trim(),
		email: req.body.email.trim(),
		password: req.body.password.trim(),
	};

	//THIS is where we need to post to the users api...but how?
	//...redirect to localhost:3001/api/users and post? needs to connect to database...
	const user = new User(userData);
	user.save((err) => {
		if (err) {
			return done(err); 
		}
		res.json({ message: 'User registration successful. Welcome to Just the Juice!' });
		return done(null);
	});
});