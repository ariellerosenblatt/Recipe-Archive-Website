import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { history } from '../helpers/history';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MyRecipeCard from '../components/MyRecipeCard';
import authHeader from '../services/auth-header';

import UserService from '../services/user.service';

const BoardUser = () => {
  const [recipes, setRecipes] = useState([]);
  const { user: currentUser } = useSelector(state => state.auth);
  useEffect(() => {
    console.log(currentUser);
    axios
      .get('http://localhost:8082/api/recipes/user/' + currentUser.id, {
        headers: authHeader(),
      })
      .then(res => {
        console.log('*******All USER RECIPES**********');
        console.log(res.data.results);
        setRecipes(res.data.results.recipes);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div className='ShowRecipeList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>My Recipes</h2>
          </div>
        </div>
        <div className='list'>
          {recipes?.map((recipe, i) => (
            <MyRecipeCard recipe={recipe} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardUser;
