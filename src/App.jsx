import React from "react";
import styles from "./App.module.css";
import Routes from "Routes";
import UserContextProvider from "components/UserContext";
import Header from "components/Header";

function App() {
  return (
    <UserContextProvider>
      <div className={styles.App}>
        <Header />
        <Routes />
      </div>
    </UserContextProvider>
  );
}

export default App;
