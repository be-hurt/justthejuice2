import React from 'react';
import PropTypes from 'prop-types';

const RecipeForm = ({onChange, arrayChange, err, onSubmit, recipe, success}) => (
    <div className="formContainer">
        <form className="form-horizontal" action="/" onSubmit={onSubmit} method="POST">
            {err.summary && <p className="error-message">{err.summary}</p>}
            {success && <p className="success">{success}</p>}
            <h3>Submit a new recipe: </h3>
            <div className="form-group">
                <label htmlFor="fieldRecipe" className="col-sm-2 control-label">Recipe name: </label>
                <div className="col-sm-4">
                    <input type="text" className="form-control" required id="fieldRecipe" name="recipe_name" onChange={onChange} errortext={err.recipe_name} value={recipe.recipe_name}/>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="fieldCategory" className="col-sm-2 control-label">Category: </label>
                <div className="col-sm-4">
                    <select className="form-control" defaultValue="" id="category" name="category" onChange={onChange} errortext={err.category}>
                        <option value="" disabled>Choose...</option>
                        <option>Coffee</option>
                        <option>Hot Chocolate</option>
                        <option>Mocktails</option>
                        <option>Punch</option>
                        <option>Smoothies</option>
                        <option>Tea</option>
                        <option>Other</option>
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="fieldDescription" className="col-sm-2 control-label">Description: </label>
                <div className="col-sm-4">
                    <textarea className="form-control" rows="5" id="description" name="description" onChange={onChange} errortext={err.description} value={recipe.description}></textarea>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="fieldIngredients" className="col-sm-2 control-label">Ingredients: </label>
                <div className="col-sm-4">
                    <textarea className="form-control" rows="5" id="ingredients" name="ingredients" placeholder="Seperate ingredients with a comma (,)" onChange={arrayChange} errortext={err.ingredients} value={recipe.ingredients}></textarea>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="fieldSteps" className="col-sm-2 control-label">Steps: </label>
                <div className="col-sm-4">
                    <textarea className="form-control" rows="5" id="steps" name="steps" placeholder="Seperate steps with a comma (,)" onChange={arrayChange} errortext={err.steps} value={recipe.steps}></textarea>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="fieldNotes" className="col-sm-2 control-label">Notes: </label>
                <div className="col-sm-4">
                    <textarea className="form-control" rows="5" id="notes" name="notes" placeholder="Seperate notes with a comma (,)" onChange={arrayChange} errortext={err.notes} value={recipe.notes}></textarea>
                </div>
            </div>
            <div className="form-group">
                <div className="">
                <button type="submit" className="btn btn-default">Submit</button>
                </div>
            </div>
        </form>
    </div>
);

RecipeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  arrayChange: PropTypes.func.isRequired,
  err: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired
};

export default RecipeForm;