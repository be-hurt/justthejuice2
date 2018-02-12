import React, { Component } from 'react';
import axios from 'axios';

// The RecipeDetail looks up the recipe using the id parsed from
// the URL's pathname. If no recipe is found with the given
// number, then a "recipe not found" message is displayed.
class RecipeDetail extends Component {

  constructor(props) {
    super(props);
    this.state = { data: {} };
    this.loadRecipesFromServer = this.loadRecipesFromServer.bind(this);
    this.makeList = this.makeList.bind(this);
    this.imageLink = this.imageLink.bind(this);
  }

  loadRecipesFromServer() {
    axios.get(`http://localhost:3001/api/recipes/${this.props.match.params.recipe_id}`)
    .then( res => {
      this.setState({data: res.data });
      this.makeList(this.state.data.ingredients, "ingredients");
      this.makeList(this.state.data.steps, "steps");
      if(this.state.data.notes !== 0) {
        this.makeList(this.state.data.notes, "notes");
      }
    })
  }

  makeList(list, id) {
    let myList = document.getElementById(id);
    for(let i=0; i < list.length; i++) {
      let listItem = document.createElement("LI");
      let text = document.createTextNode(list[i]);
      listItem.appendChild(text);
      myList.appendChild(listItem);
    }
  }

  imageLink() {
    return ("/images/" + this.state.data.image);
  }

  componentDidMount() {
    this.loadRecipesFromServer();
  }

  render() {
    return (
      <div className="recipe-full">
        <h1>{this.state.data.recipe_name}</h1>
        <img className="recipe-full-img" src={this.imageLink()} />
        <h3 className="header-text-color">Submitted by:</h3>
        <p>{this.state.data.user}</p>
        <h3 className="header-text-color">Category:</h3>
        <p>{this.state.data.category}</p>
        <h3 className="header-text-color">Rating:</h3>
        <p>{this.state.data.rating}</p>
        <h2 className="header-text-color">Description:</h2>
        <p>
          {this.state.data.description}
        </p>
        <ul id='ingredients'>
          <h2 className="header-text-color">Ingredients:</h2>
        </ul>
        <ul id="steps">
          <h2 className="header-text-color">Steps:</h2>
        </ul>
        <ul id="notes">
        </ul>
      </div>
    )
  }
}

export default RecipeDetail;
