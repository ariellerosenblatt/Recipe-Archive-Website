import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const MyRecipeCard = ({ recipe }) => {
  return (
    <div>
      <div className='card-container'>
        <img className='card-img' src={recipe.imageUrl} alt='' />
        <div className='desc'>
          <h2>
            <Link to={`/show-my-recipe/${recipe._id}`}>{recipe.title}</Link>
          </h2>
          <h3>{recipe.website}</h3>
          {/* <p>{recipe.ingredients}</p> */}
        </div>
      </div>
    </div>
  );
};

export default MyRecipeCard;
