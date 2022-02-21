import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
     function isLoggedIn() {
        return !!localStorage.getItem('token')
    }
    return (
      <Route
        {...rest}
        render={() => {
          return isLoggedIn() ? (
            children
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
    );
  }

export default PrivateRoute;
