import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { history } from '../helpers/history';
import authHeader from '../services/auth-header';

const CreateRecipe = props => {
  const { user: currentUser } = useSelector(state => state.auth);

  const [data, setData] = useState({
    title: '',
    cooktime: '',
    website: '',
    ingredients: '',
    published_date: '',
    owner: null,
    imageUrl: '',
  });

  useEffect(() => {}, []);

  const onChange = e => {
    setData({
      ...data,
      owner: currentUser.id,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(data);
    axios
      .post('http://localhost:8082/api/recipes/' + currentUser.id, data, {
        headers: authHeader(),
      })
      .then(res => {
        console.log(res);
        setData({
          title: '',
          cooktime: '',
          website: '',
          ingredients: '',
          published_date: '',
          owner: '',
          imageUrl: '',
        });
        history.push('/home');
      })
      .catch(err => {
        console.log('Error in CreateRecipe!');
      });
  };

  return (
    <div className='CreateRecipe'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Recipe List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Add Recipe</h1>
            <p className='lead text-center'>Create new recipe</p>

            <form noValidate onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Name of the Recipe'
                  name='title'
                  className='form-control'
                  value={data.title}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Cook Time'
                  name='cooktime'
                  className='form-control'
                  value={data.cooktime}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Website'
                  name='website'
                  className='form-control'
                  value={data.website}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='List the ingredients'
                  name='ingredients'
                  className='form-control'
                  value={data.ingredients}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='date'
                  placeholder='Publish Date'
                  name='published_date'
                  className='form-control'
                  value={data.published_date}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Image url'
                  name='imageUrl'
                  className='form-control'
                  value={data.imageUrl}
                  onChange={onChange}
                />
              </div>

              <input
                type='submit'
                className='btn btn-outline-warning btn-block mt-4'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
