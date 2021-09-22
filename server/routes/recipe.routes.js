const { verifyToken } = require('../middlewares/authJwt');
const controller = require('../controllers/recipe.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });
  console.log('**************************');
  console.log(controller.allRecipes);
  app.get('/api/recipes/all', controller.allRecipes);
  app.get('/api/recipes/:id', controller.oneRecipe);
  app.get('/api/recipes/user/:id', verifyToken, controller.allUserRecipes);
  app.post('/api/recipes/:id', verifyToken, controller.newRecipe);
  app.patch('/api/recipes/:id', verifyToken, controller.editRecipe);
  app.delete('/api/recipes/:id', verifyToken, controller.deleteRecipe);
};
