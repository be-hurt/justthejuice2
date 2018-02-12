var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.usersReadAll = function (req, res) {
	//retrieve all users from the database
	User.find(function(err, users) {
		if (err) 
			res.send(err);
 		//responds with a json object of all users.
 		res.json(users)
 	});
}

module.exports.usersReadOne = function(req, res) {
	//retrieve a single users' info from the database
	if (req.params && req.params.userid) {
		User
			.findById(req.params.userid)
			.exec(function(err, user) {
				if (!user) {
					sendJsonResponse(res, 404, {
						'message' : 'userid not found'
					});
					return;
				} else if (err) {
					sendJsonResponse(res, 404, err);
					return
				} 
				sendJsonResponse(res, 200, user);
			});
	} else {
		sendJsonResponse(res, 404, {'message': 'No userid in request'});
	}
};