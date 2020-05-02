import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProtectedLoginRoute from "components/ProtectedLoginRoute";
import { redirectTo } from "constants/index";
import { UserContext } from "components/UserContext";
import HomePage from "Routes/HomePage";
import SignupPage from "Routes/SignupPage";
import SearchPage from "Routes/SearchPage";
import StatsPage from "Routes/StatsPage";
import Login from "Routes/Login";
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
          {isAuthenticated ? <Redirect to="/search" /> : <HomePage />}
        </Route>
        <ProtectedLoginRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/study"
        >
          <StudyPage />
        </ProtectedLoginRoute>
        <ProtectedLoginRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/search"
        >
          <SearchPage />
        </ProtectedLoginRoute>
        <Route exact path={redirectTo}>
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignupPage />
        </Route>
        <ProtectedLoginRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/stats"
        >
          <StatsPage />
        </ProtectedLoginRoute>
        <ProtectedLoginRoute
          isAuthenticated={isAuthenticated}
          exact
          path="/account"
        >
          Account Success!!!
        </ProtectedLoginRoute>
        <Route exact path="/*">
          no match page
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
