import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import authHeader from '../services/auth-header';
import { history } from '../helpers/history';

const ShowMyRecipeDetails = props => {
  const [recipe, setRecipe] = useState({});
  useEffect(() => {
    axios
      .get('http://localhost:8082/api/recipes/' + props.match.params.id)
      .then(res => {
        console.log(res.data.results);
        // console.log("Print-showBookDetails-API-response: " + res.data);
        setRecipe(res.data.results);
      })
      .catch(err => {
        console.log('Error from ShowRecipeDetails');
      });
  }, []);

  const onDeleteClick = () => {
    console.log(recipe._id);
    axios
      .delete('http://localhost:8082/api/recipes/' + recipe._id, {
        headers: authHeader(),
      })
      .then(res => {
        history.push('/');
      })
      .catch(err => {
        console.log('Error form ShowRecipeDetails_deleteClick');
      });
  };

  return (
    <div>
      <div className='ShowRecipeDetails'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10 m-auto'>
              <br /> <br />
              <Link to='/' className='btn btn-outline-warning float-left'>
                Show Recipe List
              </Link>
            </div>
            <br />
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Recipe's Record</h1>
              <p className='lead text-center'>View Recipe's Info</p>
              <hr /> <br />
            </div>
          </div>
          <div>
            <table className='table table-hover table-dark'>
              {/* <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead> */}
              <tbody>
                <tr>
                  <th scope='row'>1</th>
                  <td>Title</td>
                  <td>{recipe.title}</td>
                </tr>
                <tr>
                  <th scope='row'>2</th>
                  <td>Website</td>
                  <td>{recipe.website}</td>
                </tr>
                <tr>
                  <th scope='row'>3</th>
                  <td>Cook Time</td>
                  <td>{recipe.cooktime}</td>
                </tr>
                {/* <tr>
            <th scope="row">4</th>
            <td>Publisher</td>
            <td>{ book.publisher }</td>
          </tr> */}
                <tr>
                  <th scope='row'>5</th>
                  <td>Published Date</td>
                  <td>{recipe.published_date}</td>
                </tr>
                <tr>
                  <th scope='row'>6</th>
                  <td>Ingredients</td>
                  <td>{recipe.ingredients}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='row'>
            <div className='col-md-6'>
              <button
                type='button'
                className='btn btn-outline-danger btn-lg btn-block'
                onClick={() => {
                  onDeleteClick();
                }}
              >
                Delete Recipe
              </button>
              <br />
            </div>

            <div className='col-md-6'>
              <Link
                to={`/edit-recipe/${recipe._id}`}
                className='btn btn-outline-info btn-lg btn-block'
              >
                Edit Recipe
              </Link>
              <br />
            </div>
          </div>
          {/* <br />
            <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit Book</button>
            <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete Book</button> */}
        </div>
      </div>
    </div>
  );
};

export default ShowMyRecipeDetails;
