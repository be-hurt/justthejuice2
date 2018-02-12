import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Recipes from './Recipes';
import RecipeDetail from './RecipeDetail';

// The RecipesRoute component matches one of two different routes
// depending on the full pathname
const RecipesRoute = () => (
  <Switch>
    <Route exact path='/recipes' component={Recipes}/>
    <Route path='/recipes/:recipe_id' component={RecipeDetail}/>
  </Switch>
)


export default RecipesRoute;