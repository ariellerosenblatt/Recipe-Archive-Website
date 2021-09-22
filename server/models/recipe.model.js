const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cooktime: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
  },
  published_date: {
    type: Date,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  imageUrl: {
    type: String,
  },
});

module.exports.Recipe = mongoose.model('Recipe', RecipeSchema);
