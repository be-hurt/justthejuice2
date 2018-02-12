import React, { Component } from 'react';
import RecipeForm from './components/RecipeForm';
import Auth from './modules/Auth';
import jwt_decode from 'jwt-decode';

class NewRecipe extends Component {
	constructor(props) {
		super(props);
 		this.state = {
 			err: {}, 
 			recipe: {
	 			recipe_name: '',
	        	category: '',
	        	rating: 0,
	        	description: '',
		        ingredients: [],
		        steps: [],
		        notes: []
	    	},
	    	success: '',
	    	message: ''
	    };
 		this.changeRecipe = this.changeRecipe.bind(this);
 		this.makeArray = this.makeArray.bind(this);
 		this.handleSubmit = this.handleSubmit.bind(this);
 		this.checkLogin = this.checkLogin.bind(this);
 	}

 	changeRecipe(event) {
	    const field = event.target.name;
	    const recipe = this.state.recipe;
	    recipe[field] = event.target.value;

	    this.setState({
	      recipe
	    });
  	}

  	//make a function to handle taking the user input for the ingredients, steps, and notes fields and parse out their contents into arrays with regex
  	makeArray(event) {
  		const field = event.target.name;
  		const fieldContents = event.target.value;
	    const recipe = this.state.recipe;

	    let myArray = fieldContents.split(",");

	    recipe[field] = myArray;

	    this.setState({
	      recipe
	    });
  	}

  	handleSubmit(e) {
  		e.preventDefault();
		let recipe_name= this.state.recipe.recipe_name.trim();
		let user = jwt_decode(Auth.getToken()).name;
		let authorid = jwt_decode(Auth.getToken()).sub;
		let category = this.state.recipe.category.trim();
		let description = this.state.recipe.description.trim();
		let ingredients = this.state.recipe.ingredients;
		let steps = this.state.recipe.steps;
		let notes = this.state.recipe.notes;

		if (!recipe_name || !category || !description || !ingredients || !steps) {
			
			return;
 		}
 		this.handleRecipeSubmit(`recipe_name=${recipe_name}&user=${user}&authorid=${authorid}&category=${category}&description=${description}&ingredients=${ingredients}&steps=${steps}&notes=${notes}`);
  	}

 	handleRecipeSubmit(recipe) {
 		if(Auth.isUserAuthenticated()) {
 			const xhr = new XMLHttpRequest();
 			xhr.open('POST', 'http://localhost:3001/api/recipes');
 			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
 			xhr.responseType = 'json';
 			xhr.addEventListener('load', () => {
 				if (xhr.status === 200) {
 					this.setState({
 						recipe: {
 							recipe_name: '', 
 							user: '', 
 							category: '', 
 							rating: 0, 
 							description: '', 
 							ingredients: [], 
 							steps: [], 
 							notes: [] 
 						},
 						success: "Recipe submitted successfully!"
 					});
 				} else {
 					console.log(recipe);
 					const errors = xhr.response.errors ? xhr.response.errors : {};
          			errors.summary = xhr.response.message;
          			this.setState({
            			errors
          			});
          			console.log(this.state.errors);
 				}
 			});
 			xhr.send(recipe);
 		} else {
      		this.setState({message: 'Oops! You must be logged in to submit a recipe.'});
    	}
 	}

 	checkLogin() {
 		if(Auth.isUserAuthenticated()) {
 			return(
 				<RecipeForm
 				onChange={this.changeRecipe}
 				arrayChange={this.makeArray}
 				err={this.state.err}
 				onSubmit={this.handleSubmit}
 				recipe={this.state.recipe}
 				success={this.state.success}
 				/>
 			);
 		} else {
 			return(
 				<div>
 					<h1>Oops!</h1>
 					<p>You are not authorized to access this page. Login <a href='/login'>here</a>.</p>
 				</div>
 			);
 		}
 	}
 	
 	render() {
 		return (
 			<div>
 				{ this.checkLogin() }
 			</div>
 		)
 	}
}

export default NewRecipe;