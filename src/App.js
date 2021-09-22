import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Switch, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import ShowRecipeList from './components/ShowRecipeList';
import Profile from './components/Profile';
import BoardUser from './components/BoardUser';
import BoardModerator from './components/BoardModerator';
import BoardAdmin from './components/BoardAdmin';

import { logout } from './actions/auth';
import { clearMessage } from './actions/message';

import { history } from './helpers/history';
import CreateRecipe from './components/CreateRecipe';
import ShowRecipeDetails from './components/ShowRecipeDetails';
import ShowMyRecipeDetails from './components/ShowMyRecipeDetails';
import UpdateRecipeInfo from './components/UpdateRecipeInfo';
const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen(location => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes('ROLE_MODERATOR'));
      setShowAdminBoard(currentUser.roles.includes('ROLE_ADMIN'));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <nav className='navbar navbar-expand navbar-dark myBg bg-dark'>
          <Link to={'/'} className='navbar-brand'>
            Arielle's Recipes
          </Link>
          <div className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to={'/home'} className='nav-link'>
                All Recipes
              </Link>
            </li>

            {showModeratorBoard && (
              <li className='nav-item'>
                <Link to={'/mod'} className='nav-link'>
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className='nav-item'>
                <Link to={'/admin'} className='nav-link'>
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className='nav-item'>
                <Link to={'/user'} className='nav-link'>
                  My Recipes
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/profile'} className='nav-link'>
                  {currentUser.username}
                </Link>
              </li>
              <li className='nav-item'>
                <a href='/login' className='nav-link' onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/login'} className='nav-link'>
                  Login
                </Link>
              </li>

              <li className='nav-item'>
                <Link to={'/register'} className='nav-link'>
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div style={{ padding: 0 }} className='container-fluid'>
          <Switch>
            <Route exact path={['/', '/home']} component={ShowRecipeList} />
            <Route exat path='/create-recipe' component={CreateRecipe} />
            <Route path='/show-recipe/:id' component={ShowRecipeDetails} />
            <Route path='/show-my-recipe/:id' component={ShowMyRecipeDetails} />
            <Route path='/edit-recipe/:id' component={UpdateRecipeInfo} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profile' component={Profile} />
            <Route path='/user' component={BoardUser} />
            <Route path='/mod' component={BoardModerator} />
            <Route path='/admin' component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
