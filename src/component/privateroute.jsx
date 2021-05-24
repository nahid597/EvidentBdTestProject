import React, { memo } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = memo((props) => {
  const { component: Component, ...otherProps } = props;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let authenticated = false;
  if (userInfo && userInfo.token) {
    authenticated = true;
  }

  return (
    <Route
      {...otherProps}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect exact to="/login" />
        )
      }
    />
  );
});

export default PrivateRoute;
