import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user: currentUser } = useSelector(state => state.auth);

  if (!currentUser) {
    return <Redirect to='/login' />;
  }

  return (
    <div className='container-fluid userBoard'>
      <div className='row'>
        <div className='col-sm-12 text-center mt-5'>
          <h3>
            <strong>{currentUser.username}</strong>'s Profile
          </h3>

          <p>
            {/* <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)}{' '}
            ...{' '}
            {currentUser.accessToken.substr(
              currentUser.accessToken.length - 20
            )} */}
          </p>
          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          {/* <strong>Authorities:</strong>
          <ul style={{ listStyle: 'none' }}>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li className='my-3' key={index}>
                  {role}
                </li>
              ))}
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
