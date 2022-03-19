import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { isLoggedIn } from "utils";

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isLoggedIn() ? (<Component {...props}/>) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

AuthRoute.propTypes = {
  location: PropTypes.object,
  component: PropTypes.func
};

export default AuthRoute;
