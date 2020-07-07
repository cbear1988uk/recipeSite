const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: String,
  date: String,
  description: String,
  description2: String,
  description3: String,
  ingredients: String,
  categoryId: String
});

module.exports = mongoose.model('Recipe', recipeSchema);
