import React from "react";
import styles from "./styles.module.css";
import Button from "components/Button";
import Logo from "components/Logo";
import logoSrc from "assets/circle.svg";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Word!</h1>
      <Logo className={styles.logo} imageSrc={logoSrc} size={"120px"} />
      <p className={styles.infoText}>
        For words you might not know, find out their meanings and study them!
      </p>
      <div className={styles.buttons}>
        <Button text="Sign In" onClick={() => history.push("/login")} />
        <Button
          text="Create New"
          onClick={() => history.push("/signup")}
          altStyle
        />
      </div>
    </div>
  );
};

export default HomePage;
