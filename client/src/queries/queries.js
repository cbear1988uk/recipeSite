import {gql} from 'apollo-boost';

const getRecipesQuery = gql`
  {
    recipes{
      name
      date
      ingredients
      description
      description2
      description3
      id
    }
  }
`

const getCategoriesQuery = gql`
  {
    categories{
      name
      id
    }
  }
`

const addRecipeMutation = gql`
  mutation($name: String!, $date: String!, $ingredients: String!, $description: String!, $description2: String!, $description3: String!, $categoryId: ID!){
    addRecipe(name: $name, date: $date, ingredients: $ingredients, description: $description, description2: $description2, description3: $description3, categoryId: $categoryId){
      name
      id
    }
  }
`

const getRecipeQuery = gql`
  query($id: ID){
    recipe(id: $id){
      id
      name
      date
      ingredients
      description
      description2
      description3
      category{
        id
        name
        recipes{
          name
          id
        }
      }
    }
  }
`

export {getCategoriesQuery, getRecipesQuery, addRecipeMutation, getRecipeQuery};
