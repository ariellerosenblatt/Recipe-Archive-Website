import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { history } from '../helpers/history';
import authHeader from '../services/auth-header';

const UpdateRecipeInfo = props => {
  const [recipe, setRecipe] = useState({
    title: '',
    cooktime: '',
    website: '',
    ingredients: '',
    published_date: '',
  });
  useEffect(() => {
    axios
      .get('http://localhost:8082/api/recipes/' + props.match.params.id)
      .then(res => {
        setRecipe(res.data.results);
      })
      .catch(err => {
        console.log('Error from UpdateRecipeInfo');
      });
  }, []);

  const onChange = e => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    axios
      .patch(
        'http://localhost:8082/api/recipes/' + props.match.params.id,
        recipe,
        { headers: authHeader() }
      )
      .then(res => {
        history.push('/show-my-recipe/' + props.match.params.id);
      })
      .catch(err => {
        console.log('Error in UpdateRecipeInfo!');
      });
  };

  return (
    <div className='UpdateRecipeInfo'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Recipe List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Recipe</h1>
            <p className='lead text-center'>Update Recipe's Info</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
          <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                placeholder={recipe.title}
                name='title'
                className='form-control'
                value={recipe.title}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='cooktime'>Cook Time</label>
              <input
                type='text'
                placeholder={recipe.cooktime}
                name='cooktime'
                className='form-control'
                value={recipe.cooktime}
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='website'>Website</label>
              <input
                type='text'
                placeholder={recipe.website}
                name='website'
                className='form-control'
                value={recipe.website}
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='ingredients'>Ingredients</label>
              <input
                type='text'
                placeholder={recipe.ingredients}
                name='ingredients'
                className='form-control'
                value={recipe.ingredients}
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='published_date'>Published Date</label>
              <input
                type='date'
                placeholder={recipe.published_date}
                name='published_date'
                className='form-control'
                value={recipe.published_date}
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='imageUrl'>Image Url</label>
              <input
                type='text'
                placeholder='Replace Image Url'
                name='imageUrl'
                className='form-control'
                value={recipe.imageUrl}
                onChange={onChange}
              />
            </div>

            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Update Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRecipeInfo;
