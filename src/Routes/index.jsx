import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// all routes go here
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          home page
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
