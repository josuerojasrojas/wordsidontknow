import React from "react";
import styles from "./App.module.css";
import Routes from "Routes";
import UserContextProvider from "components/UserContext/index";

function App() {
  return (
    <div className={styles.App}>
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
    </div>
  );
}

export default App;
