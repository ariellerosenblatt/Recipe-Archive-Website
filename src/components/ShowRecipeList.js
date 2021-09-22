import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { history } from '../helpers/history';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';

const ShowRecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const { user: currentUser } = useSelector(state => state.auth);
  useEffect(() => {
    axios
      .get('http://localhost:8082/api/recipes/all')
      .then(res => {
        console.log(res.data.results);
        setRecipes(res.data.results);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='ShowRecipeList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>Recipes List</h2>
          </div>

          <div className='col-md-11'>
            {currentUser && (
              <Link
                to='/create-recipe'
                className='btn btn-outline-warning float-right'
              >
                + Add New Recipe
              </Link>
            )}
            <br />
            <br />
            <hr />
          </div>
        </div>

        <div className='list'>
          {recipes?.map((recipe, i) => (
            <RecipeCard recipe={recipe} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowRecipeList;
