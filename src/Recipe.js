import React, { Component } from 'react';
import marked from 'marked';
import { Link } from 'react-router-dom';

class Recipe extends Component {
	rawMarkup() {
 		let rawMarkup = marked(this.props.children.toString());
 		return { __html: rawMarkup };
 	}
 	
 	render() {
 		return (
 			<div className="recipe-card">
 				<div className="recipe-card-photo">
 					<img src={`/images/${this.props.image}`} />
 				</div>
 				<div className="recipe-card-text">
		 			<Link to={`/recipes/${this.props.id}`}><h3>{this.props.name}</h3></Link>
		 			<p>
		 				<span dangerouslySetInnerHTML={ this.rawMarkup() } />
					</p>
				</div>
			</div>
 		)
 	}
}

export default Recipe;