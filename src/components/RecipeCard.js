import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const RecipeCard = props => {
  const recipe = props.recipe;

  return (
    <div className='card-container'>
      <img className='card-img' src={recipe.imageUrl} alt='' />
      <div className='desc'>
        <h2>
          <Link className='card-link' to={`/show-recipe/${recipe._id}`}>
            {recipe.title}
          </Link>
        </h2>
        <h3>{recipe.website}</h3>
        {/* <p>{recipe.ingredients}</p> */}
      </div>
    </div>
  );
};

export default RecipeCard;
