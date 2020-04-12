import React from "react";
import styles from "./App.module.css";
import Routes from "Routes";
import UserContextProvider from "components/UserContext";
import Header from "components/Header";

function App() {
  return (
    <div className={styles.App}>
      <UserContextProvider>
        <Header />
        <Routes />
      </UserContextProvider>
    </div>
  );
}

export default App;
