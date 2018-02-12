var mongoose = require('mongoose');
var credentials = require('../../credentials.js');
var gracefulShutdown;

//set the options for our connection
var opts = {
    server: {
        useMongoClient: true
    }
};

//check which environment we're in and set the database connection accordingly
var dbURI = credentials.mongo.development.connectionString;
if (process.env.NODE_ENV == 'production') {
	dbURI = credentials.mongo.production.connectionString;
};

mongoose.connect(dbURI, opts);

var readLine = require("readline");
if (process.platform == "win32") {
	var rl = readLine.createInterface ({
		input: process.stdin,
		output: process.stdout
	});
	rl.on ("SIGINT", function() {
		process.emit ("SIGINT");
	});
};

mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected.');
});

//close mongoose connection
gracefulShutdown = function(msg, callback) {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
};

//call gracefulShutdown when app terminates
//for app termination
process.on('SIGINT', function() {
	gracefulShutdown('app termination', function() {
		process.exit(0);
	});
});

//for heroku app termination
process.on('SIGTERM', function() {
	gracefulShutdown('Heroku app shutdown', function() {
		process.exit(0);
	});
});

require('./recipes');
require('./users');