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
        <Route exact path="/study">
          study page
        </Route>
        <Route exact path="/search">
          search
        </Route>
        <Route exact path="/login">
          login page
        </Route>
        <Route exact path="/signup">
          signup
        </Route>
        <Route exact path="/stats">
          stats
        </Route>
        <Route exact path="/account">
          account
        </Route>
        <Route exact path="/*">
          {/* 404 page */}
          no match page
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
