var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.recipesReadOne = function (req, res) {
	if (req.params && req.params.recipeid) {
		Recipe
			.findById(req.params.recipeid)
			.exec(function(err, recipe) {
				if (!recipe) {
					sendJsonResponse(res, 404, {
						'message' : 'recipeid not found'
					});
					return;
				} else if (err) {
					sendJsonResponse(res, 404, err);
					return
				} 
				sendJsonResponse(res, 200, recipe);
			});
	} else {
		sendJsonResponse(res, 404, {'message': 'No recipeid in request'});
	}
};

module.exports.recipesReadAll = function (req, res) {
	Recipe.find((err, recipes) => {
		if (err) {
			res.send(err);
		}
		//respond with a json object of recipes in database
		res.json(recipes)
	});
}

module.exports.recipesCreate = function (req, res) {
	Recipe.create({
 		recipe_name: req.body.recipe_name,
 		user: req.body.user,
 		author_id: req.body.authorid,
 		submitted: new Date(),
 		category: req.body.category,
 		rating: 0,
 		description: req.body.description,
 		ingredients: req.body.ingredients,
 		steps: req.body.steps,
 		notes: req.body.notes,
 		image: "",
	}, function(err, wall) {
		if(err) {
			sendJsonResponse(res, 400, err);
		} else {
			sendJsonResponse(res, 200, wall);
		}
	});
};

module.exports.recipesDeleteOne = function (req, res) {
	if (req.params && req.params.recipeid && req.params.userid) {
		Recipe
			.findById(req.params.recipeid)
			.exec(function(err, recipe) {
				if (!recipe) {
					sendJsonResponse(res, 404, {
						'message' : 'recipeid not found'
					});
					return;
				} else if (req.body.userid !== recipe.authorId) {
					sendJsonResponse(res, 401, {'message': 'You are not authorized to delete this comment.'});
				} else if (err) {
					sendJsonResponse(res, 404, err);
					return
				} else {
					recipe.id(req.params.recipeid).remove();
						recipe.save(function(err) {
							if(err) {
								sendJsonResponse(res, 404, err);
							} else {
								sendJsonResponse(res, 200, {'message': 'Recipe successfully deleted.'});
							}
						});
				}
			});
	} else {
		sendJsonResponse(res, 404, {'message': 'Not found: recipeid and userid are required.'});
	}
}
