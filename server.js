//import dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var Recipe = require('./server/model/recipes');
var User = require('./server/model/users');
var credentials = require('./credentials');

var routesApi = require('./server/routes/api')

//create instances
var app = express();
var router = express.Router();

//set port for api
var api_port = process.env.API_PORT || 3001;

//db config
mongoose.connect(credentials.mongo.development.connectionString);

//configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
 	res.setHeader('Access-Control-Allow-Credentials', 'true');
 	res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

	//and remove cacheing so we get the most recent recipes
	res.setHeader('Cache-Control', 'no-cache');
	next();
});

/*USER AUTHENTICATION*/
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/status', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/status', apiRoutes);

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
	res.json({ message: 'API Initialized!'});
});
/*AUTHENTICATION END*/

//Use our router configuration when we call /api
app.use('/api', router);
app.use('/api', routesApi);

//starts the server and listens for requests
app.listen(api_port, function() {
	console.log('api running on port ' + api_port);
});