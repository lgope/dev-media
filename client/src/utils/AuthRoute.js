import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, authenticated, ...other }) => (
  <Route
    {...other}
    render={props =>
      authenticated === true ? <Redirect to='/' /> : <Component {...props} />
    }
  />
);
export default AuthRoute;
