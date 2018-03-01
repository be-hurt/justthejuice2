//get dependencies
import React, { Component } from 'react';
import RandomRecipe from './RandomRecipe';
import BestRated from './BestRated';
import Carousel from './components/Carousel';

class Home extends Component {
 	constructor(props) {
 		super(props);
 		this.state = { 
 			data: [],
 			errors: {}
 		};
 		this.loadRecipesFromServer = this.loadRecipesFromServer.bind(this);
 		this.handleRecipeSubmit = this.handleRecipeSubmit.bind(this);
 		this.displayRandom = this.displayRandom.bind(this);
 		this.displayHighestRated.bind(this);
 	}

 	/*create a function to check if the user has logged in. If so,
	display their username in the nav bar, with a logout option
 	*/

 	loadRecipesFromServer() {
	    // create an AJAX request
	    const xhr = new XMLHttpRequest();
	    xhr.open('GET', 'http://localhost:3001/api/recipes');
	    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	    xhr.responseType = 'json';
	    xhr.addEventListener('load', () => {
	      if (xhr.status === 200) {
	        // change the component-container state
	        this.setState({
	          data: xhr.response
	        });
	        console.log(xhr.response);
	      } else {
	        const errors = xhr.response.errors ? xhr.response.errors : {};
	        errors.summary = xhr.response.message;

	        this.setState({
	          errors
	        });
	      }
	    });
	    xhr.send();
 	}

 	displayRandom() {
 		if (this.state.data.length !== 0) {
 			return (
 				<RandomRecipe data={this.state.data}/>
 			);
 		}
 	}

 	displayHighestRated() {
 		if (this.state.data.length !== 0) {
 			return (
 				<BestRated data={this.state.data}/>
 			);
 		}
 	}

 	handleRecipeSubmit() {
 		//add POST request
 	}

 	componentWillMount() {
 		this.loadRecipesFromServer();
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
 				<Carousel />
 				<h1 className="header-text-color">Random Recipe:</h1>
 				{ this.displayRandom() }
 				<h1 className="header-text-color">Highest Rated:</h1>
 				{ this.displayHighestRated() }
 			</div>
 		)
 	}
}

export default Home;