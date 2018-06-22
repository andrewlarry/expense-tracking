import React from 'react';
import { Route } from 'react-router-dom';

const isLoggedin = () => {
  return true;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

export default PrivateRoute;