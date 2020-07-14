import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getCategoriesQuery, addRecipeMutation, getRecipesQuery} from '../queries/queries';
import {flowRight as compose} from 'lodash';

class AddRecipe extends Component{
  constructor(props){
    super(props);
    this.state={
      name: "",
      date: "",
      ingredients: "",
      description: "",
      description2: "",
      description3: "",
      categoryId: ""
    };
  }
  displayCategories(){
    var data = this.props.getCategoriesQuery;
    if(data.loading){
      return(<option>Loading categories..</option>);
    }else{
      return data.categories.map(category => {
        return(<option key={category.id} value={category.id}>{category.name}</option>);
      })
    }
  }
  submitForm(e){
    e.preventDefault();
    this.props.addRecipeMutation({
      variables: {
        name: this.state.name,
        date: this.state.date,
        ingredients: this.state.ingredients,
        description: this.state.description,
        description2: this.state.description2,
        description3: this.state.description3,
        categoryId: this.state.categoryId
      },
      refetchQueries: [{query: getRecipesQuery}]
    });
  }
  render() {
    return(
      <form id="add-recipe" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Recipe Name: </label>
          <input type="text" onChange={(e) => this.setState({name:e.target.value})}/>
        </div>
        <div className="field">
          <label>Recipe Date: </label>
          <input type="text" onChange={(e) => this.setState({date:e.target.value})}/>
        </div>
        <div className="field">
          <label>Ingredients: </label>
          <input type="text" onChange={(e) => this.setState({ingredients:e.target.value})}/>
        </div>
        <div className="field">
          <label>Description: </label>
          <input type="text" onChange={(e) => this.setState({description:e.target.value})}/>
        </div>
        <div className="field">
          <label>Description 2: </label>
          <input type="text" onChange={(e) => this.setState({description2:e.target.value})}/>
        </div>
        <div className="field">
          <label>Description 3: </label>
          <input type="text" onChange={(e) => this.setState({description3:e.target.value})}/>
        </div>
        <div className="field">
          <label>Category </label>
          <select onChange={(e) => this.setState({categoryId:e.target.value})}>
            <option>Select Category</option>
            {this.displayCategories()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getCategoriesQuery, {name: "getCategoriesQuery"}),
  graphql(addRecipeMutation, {name: "addRecipeMutation"})
)(AddRecipe);
