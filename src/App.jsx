import React from "react";
import styles from "./App.module.css";
import Routes from "Routes";
import UserContextProvider from "components/UserContext";

function App() {
  return (
    <UserContextProvider>
      <div className={styles.App}>
        <Routes />
      </div>
    </UserContextProvider>
  );
}

export default App;
