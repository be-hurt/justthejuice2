//get dependencies
import React, { Component } from 'react';
import axios from 'axios';
import RecipeList from './RecipeList';

class Recipes extends Component {
 	constructor(props) {
 		super(props);
 		this.state = { data: [] };
 		this.loadRecipesFromServer = this.loadRecipesFromServer.bind(this);
 	}

 	loadRecipesFromServer() {
 		axios.get('http://localhost:3001/api/recipes')
 		.then( res => {
 			//remember: setState is asyncronous
 			this.setState({data: res.data });
 		})
 	}

 	componentDidMount() {
 		this.loadRecipesFromServer();
 		this.loadInterval = setInterval(this.loadRecipesFromServer, 10000);
 	}

 	componentWillUnmount () {
    	this.loadInterval && clearInterval(this.loadInterval);
    	this.loadInterval = false;
	}

 	render() {

 		//add a 'most recent' component as well
 		return (
 			<div>
 				
 				<h1>Recipes:</h1>
 				<RecipeList data={this.state.data}
 				/>
 			</div>
 		)
 	}
}

export default Recipes;