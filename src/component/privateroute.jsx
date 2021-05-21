import React, {useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppContext from '../context/appcontext';

const PrivateRoute = (props) => {
    const{authenticated} =  useContext(AppContext);
    const { component: Component, ...otherProps } = props;

    return(
        <Route 
            {...otherProps}
            render={props => 
            authenticated ? (<Component {...props} />):
            (<Redirect exact to="/login" />)
            }
        />
    )
};

export default PrivateRoute;