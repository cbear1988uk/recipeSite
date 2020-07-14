import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

// components
import RecipeList from './components/RecipeList';
import AddRecipe from './components/AddRecipe';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render(){
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Big Recipe Site</h1>
          <RecipeList/>
          <AddRecipe/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
