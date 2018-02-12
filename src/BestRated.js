import React, { Component } from 'react';
import Recipe from './Recipe';

class BestRated extends Component {

	GetHighestRated(recipes) {
		//get the recipe with the highest rating from props
		//first, add all the ratings to an array
		let ratings = [];

		for (let i = 0; i < recipes.length; i++) {
			ratings.push(recipes[i].rating);
		}

		//now grab the index of the highest rated of the recipes
		let idx = ratings.indexOf(Math.max.apply(null, ratings));

		//plop that into our return statement
        return (
        	<Recipe name={ recipes[idx].recipe_name } key={ recipes[idx].recipe_id } id={ recipes[idx]._id} image={ recipes[idx].image }>
 				{ recipes[idx].description}
 			</Recipe>
        )
    }

	render() {
		let recipes = this.props.data;
		//let myRecipe = this.GetHighestRated(recipes);

		let myRecipe;

    	if(this.props.data !== '') {
        	myRecipe = this.GetHighestRated(recipes);
    	} else {
        	myRecipe = null
    	}

 		return (
 			<div>
 				{ myRecipe }
 			</div>
 		)
 	}
}

export default BestRated;