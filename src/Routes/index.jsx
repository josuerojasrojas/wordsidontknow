import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedLoginRoute from "components/ProtectedLoginRoute";
import { redirectTo } from "constants/index";
import { UserContext } from "components/UserContext";
import HomePage from "Routes/HomePage";
import SignupPage from "Routes/SignupPage";
import SearchPage from "Routes/SearchPage";
import StatsPage from "Routes/StatsPage";
import AccountPage from "Routes/AccountPage";
import Login from "Routes/Login";
import Header from "components/Header";
import StudyPage from "Routes/StudyPage";
import styles from "./styles.module.css";

// Routes Array
const routes = (isAuthenticated) => [
  {
    name: "Home",
    sidebar: !isAuthenticated,
    path: "/",
    exact: true,
    main: () => <HomePage isAuthenticated={isAuthenticated} />,
  },
  {
    name: "Study",
    protectedRoute: true,
    sidebar: isAuthenticated,
    path: "/study",
    exact: true,
    main: () => <StudyPage />,
    isAuthenticated: isAuthenticated,
    redirectTo: redirectTo,
  },
  {
    name: "Search",
    protectedRoute: true,
    sidebar: isAuthenticated,
    path: "/search",
    exact: true,
    main: () => <SearchPage />,
    isAuthenticated: isAuthenticated,
    redirectTo: redirectTo,
  },
  {
    name: "Login",
    sidebar: !isAuthenticated,
    path: "/login",
    exact: true,
    main: () => <Login />,
  },
  {
    name: "Sign Up",
    sidebar: !isAuthenticated,
    path: "/signup",
    exact: true,
    main: () => <SignupPage />,
  },
  {
    name: "Stats",
    protectedRoute: true,
    sidebar: isAuthenticated,
    path: "/stats",
    exact: true,
    main: () => <StatsPage />,
    isAuthenticated: isAuthenticated,
    redirectTo: redirectTo,
  },
  {
    name: "Account",
    protectedRoute: true,
    sidebar: isAuthenticated,
    path: "/account",
    exact: true,
    main: () => <AccountPage />,
    isAuthenticated: isAuthenticated,
    redirectTo: redirectTo,
  },
  {
    name: "Feedback",
    isExternal: true,
    sidebar: true,
    path: "https://github.com/josuerojasrojas/wordsidontknow/issues",
  },
  {
    name: "Source",
    isExternal: true,
    sidebar: true,
    path: "https://github.com/josuerojasrojas/wordsidontknow",
  },
  {
    path: "/*",
    exact: true,
    main: () => <SignupPage />,
  },
];

// all routes go here
const Routes = () => {
  const { user } = useContext(UserContext);
  const { isAuthenticated } = user;

  const _routes = routes(isAuthenticated);

  // TODO: should return loading or something while the user is setup
  if (!user.isUserReady) return "";
  return (
    <Router>
      <Header _routes={_routes} />
      <div className={styles.page}>
        <Switch>
          {_routes.map((route, index) => {
            if (route.isExternal) return "";
            return route.protectedRoute ? (
              <ProtectedLoginRoute
                key={index}
                children={route.main}
                exact={route.exact}
                isAuthenticated={route.isAuthenticated}
                path={route.path}
              />
            ) : (
              <Route
                key={index}
                exact={route.exact}
                path={route.path}
                children={route.main}
              />
            );
          })}
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
