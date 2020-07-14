import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getRecipeQuery} from '../queries/queries';

class RecipeDetails extends Component{
  displayRecipeDetails(){
    const{recipe} = this.props.data;
    if(recipe){
      return(
        <div>
          <h2>{recipe.name}</h2>
          <p>{recipe.date}</p>
          <p>{recipe.ingredients}</p>
          <p>{recipe.description}</p>
          <p>{recipe.description2}</p>
          <p>{recipe.description3}</p>
          <p className="category">
            {recipe.category.recipes.map(item =>{
              return <li key={item.id}>{item.name}</li>
            })}
          </p>
        </div>
      )
    }else{
      return(
        <div>No recipe selected..</div>
      )
    }
  }
  render(){
    return (
      <div id="recipe-details">
        {this.displayRecipeDetails()}
      </div>
    );
  }
}

export default graphql(getRecipeQuery, {
  option: (props) => {
    return{
      variables:{
        id: props.recipeId
      }
    }
  }
})(RecipeDetails);
