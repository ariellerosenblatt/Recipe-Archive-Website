import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8082/api/recipes/';

const getAllRecipes = () => {
  return axios.get(API_URL + 'all');
};

const createRecipe = (id, recipe) => {
  return axios.get(API_URL + id, recipe, { headers: authHeader() });
};

const getOneRecipe = id => {
  return axios.get(API_URL + id, { headers: authHeader() });
};

const updateRecipe = id => {
  return axios.get(API_URL + id, { headers: authHeader() });
};

const deleteRecipe = id => {
  return axios.get(API_URL + id, { headers: authHeader() });
};

export default {
  getAllRecipes,
  createRecipe,
  getOneRecipe,
  updateRecipe,
  deleteRecipe,
};
