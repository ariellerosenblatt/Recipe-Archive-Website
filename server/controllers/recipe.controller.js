const { Recipe } = require('../models/recipe.model');
const User = require('../models/user.model');

module.exports = {
  // Read methods --> app.get
  allRecipes: (req, res) => {
    Recipe.find({})
      .then(recipes => res.json({ message: 'success', results: recipes }))
      .catch(err => res.json({ message: 'error', results: err }));
  },
  allUserRecipes: (req, res) => {
    User.findById({ _id: req.params.id })
      .populate('recipes')
      .then(recipes => res.json({ message: 'success', results: recipes }))
      .catch(err => res.json({ message: 'error', results: err }));
  },
  oneRecipe: (req, res) => {
    Recipe.findOne({ _id: req.params.id })
      .then(recipe => res.json({ message: 'success', results: recipe }))
      .catch(err => res.json({ message: 'error', results: err }));
  },

  //Create methods --> app.post
  newRecipe: (req, res) => {
    Recipe.create(req.body)
      .then(recipe => {
        return User.findByIdAndUpdate(
          { _id: req.params.id },
          { $push: { recipes: recipe._id } },
          { new: true }
        );
      })
      .then(user => res.json({ message: 'success', results: user }))
      .catch(err => res.json({ message: 'error', results: err }));
  },

  //Update methods --> app.put or app.patch
  editRecipe: (req, res) => {
    Recipe.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      runValidators: true,
      new: true,
      useFindAndModify: false,
    })
      .then(recipe => res.json({ message: 'success', results: recipe }))
      .catch(err => res.json({ message: 'error', results: err }));
  },

  //Delete methods --> app.delete
  deleteRecipe: (req, res) => {
    Recipe.findByIdAndDelete({ _id: req.params.id })
      .then(recipe => res.json({ message: 'success', results: recipe }))
      .catch(err => res.json({ message: 'error', results: err }));
  },
};
