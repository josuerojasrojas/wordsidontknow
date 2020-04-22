import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "components/ProtectedRoute";
import HomePage from "./HomePage";
import { redirectTo } from "constants/index";
import { UserContext } from "components/UserContext";
import Login from "Routes/Login";
import SignupPage from "Routes/SignupPage";
import Header from "components/Header";
import StudyPage from "Routes/StudyPage";

// all routes go here
const Routes = () => {
  const { user } = useContext(UserContext);
  const { isAuthenticated } = user;
  // TODO: should return loading or something while the user is setup
  if (!user.isUserReady) return "";
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          redirectTo={redirectTo}
          exact
          path="/study"
        >
          <StudyPage />
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
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignupPage />
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
