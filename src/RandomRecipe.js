import React, { Component } from 'react';
import Recipe from './Recipe';

class RandomRecipe extends Component {

	//TODO: Maybe add some functionality that prevents the highest rated recipe from showing up here as well
	GetRandom(recipes) {
		let i = recipes.length;
        let idx = Math.floor(Math.random() * i);
        return (
        	<Recipe name={ recipes[idx].recipe_name } key={ recipes[idx].recipe_id } id={ recipes[idx]._id } image={ recipes[idx].image }>
 				{ recipes[idx].description}
 			</Recipe>
        )
    }

	render() {
		let recipes = this.props.data;
		let myRecipe;

    	if(recipes) {
        	myRecipe = this.GetRandom(recipes);
    	} else {
        	myRecipe = null;
    	}

 		return (
 			<div>
 				{ myRecipe }
 			</div>
 		)
 	}
}

export default RandomRecipe;