var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
    recipe_name: {type: String, required: true},
    author_id: {type: String, required: true},
    user: {type: String, required: true},
    submitted: Date,
    category: {type: String, required: true},
    rating: Number,
    description: String,
    ingredients: {type: [String], required: true},
    steps: {type: [String], required: true},
    notes: [String],
    image: String,
});

var Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
