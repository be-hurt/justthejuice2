import React, { Component } from 'react';
import Recipe from './Recipe';
import style from './stylesheets/style.css';

//TODO: Add a button that routes to a form for adding a new recipe to the database

class RecipeList extends Component {

	render() {
 		let recipeNodes = this.props.data.map(recipe => {
				return (
 					<Recipe name={ recipe.recipe_name } key={ recipe._id } id={ recipe._id } image={ recipe.image }>
 							{ recipe.description }
 					</Recipe>
 				)
 		})
 		return (
 			<div style={ style.recipe }>
 				{ recipeNodes }
 			</div>
 		)
 	}
}

export default RecipeList;