import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getRecipesQuery} from '../queries/queries';

//components
import RecipeDetails from './RecipeDetails';

class RecipeList extends Component{
  constructor(props){
    super(props);
    this.state = {
      selected: null
    }
  }
  displayRecipes(){
    var data = this.props.data;
    if(data.loading){
      return(<div>Loading Recipes..</div>);
    }else{
      return data.recipes.map(recipe => {
        return(
          <li key={recipe.id} onClick={(e) => {this.setState({selected: recipe.id})}}>{recipe.name}</li>
        );
      })
    }
  }
  render(){
    return(
      <div>
        <ul id="recipe-list">
          {this.displayRecipes()}
        </ul>
        <RecipeDetails recipeId={this.state.selected}/>
      </div>
    );
  }
}

export default graphql(getRecipesQuery)(RecipeList);
