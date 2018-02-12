import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import RecipesRoute from './RecipesRoute';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import AddRecipe from './AddRecipe';

const Main = () => (
	<main>
		<Switch>
	  		<Route exact path='/' component={Home} />
	   		<Route path='/recipes' component={RecipesRoute} />
	   		<Route path='/submit' component={AddRecipe} />
	   		<Route exact path='/login' component={LoginPage} />
	   		<Route exact path='/signup' component={SignUpPage} />
	  	</Switch>
  	</main>
);

export default Main;