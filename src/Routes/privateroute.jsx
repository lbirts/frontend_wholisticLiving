import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils/loggedin'

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;