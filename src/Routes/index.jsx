import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "components/ProtectedRoute";
import { redirectTo } from "constants/index";

// all routes go here
const Routes = () => {
  const isAuthenticated = true;
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          home page
        </Route>
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          redirectTo={redirectTo}
          exact
          path="/study"
        >
          Study Success!!!
        </ProtectedRoute>
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          redirectTo={redirectTo}
          exact
          path="/search"
        >
          Search Success!!!
        </ProtectedRoute>
        <Route exact path={redirectTo}>
          login page
        </Route>
        <Route exact path="/signup">
          signup
        </Route>
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          redirectTo={redirectTo}
          exact
          path="/stats"
        >
          Stats Success!!!
        </ProtectedRoute>
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          redirectTo={redirectTo}
          exact
          path="/account"
        >
          Account Success!!!
        </ProtectedRoute>
        <Route exact path="/*">
          no match page
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
