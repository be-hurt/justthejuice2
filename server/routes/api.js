const express = require('express');
const router = express.Router();
const ctrlRecipes = require('../controllers/recipes');
const ctrlUsers = require('../controllers/users');

//recipes
router.get('/recipes', ctrlRecipes.recipesReadAll);
router.post('/recipes', ctrlRecipes.recipesCreate);
router.get('/recipes/:recipeid', ctrlRecipes.recipesReadOne);
router.delete('/recipes/:recipeid', ctrlRecipes.recipesDeleteOne);

//users
router.get('/users', ctrlUsers.usersReadAll);
router.get('/users/:userid', ctrlUsers.usersReadOne);
//note that all user post requests are handled by auth.js routes

module.exports = router;