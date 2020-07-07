const graphql = require('graphql');
const _ = require('lodash');
const Recipe = require('../models/recipe');
const Category = require('../models/category');

const {GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const RecipeType = new GraphQLObjectType({
  name: 'Recipe',
  fields: () => ({
    name: {type: GraphQLString},
    date: {type: GraphQLString},
    description: {type: GraphQLString},
    description2: {type: GraphQLString},
    description3: {type: GraphQLString},
    ingredients: {type: GraphQLString},
    id: {type: GraphQLID},
    category: {
      type: CategoryType,
      resolve(parent, args){
        return Category.findById(parent.categoryId);
      }
    }
  })
});

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    recipes: {
      type: new GraphQLList(RecipeType),
      resolve(parent, args){
        return Recipe.find({ categoryId: parent.id});
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    recipe:{
      type: RecipeType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return Recipe.findById(args.id);
      }
    },
    category: {
      type: CategoryType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return Category.findById(args.id);
      }
    },
    recipes: {
      type: new GraphQLList(RecipeType),
      resolve(parent, args){
        return Recipe.find({});
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args){
        return Category.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCategory: {
      type: CategoryType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(parent, args){
        let category = new Category({
          name: args.name
        });
        return category.save();
      }
    },
    addRecipe: {
      type: RecipeType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        date: {type: new GraphQLNonNull(GraphQLString)},
        description: {type:  new GraphQLNonNull(GraphQLString)},
        description2: {type: GraphQLString},
        description3: {type: GraphQLString},
        ingredients: {type: new GraphQLNonNull(GraphQLString)},
        categoryId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        let recipe = new Recipe({
          name: args.name,
          date: args.date,
          description: args.description,
          description2: args.description2,
          description3: args.description3,
          ingredients: args.ingredients,
          categoryId: args.categoryId
        });
        return recipe.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
