import React from "react";
import styles from "./styles.module.css";
import Button from "components/Button";
import Logo from "components/Logo";
import logoSrc from "assets/circle.svg";

const HomePage = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Word!</h1>
      <Logo className={styles.logo} imageSrc={logoSrc} size={"120px"} />
      <p className={styles.infoText}>
        For words you might not know, find out their meanings and study them!
      </p>
      {/* TODO: add onclick to go to login or create page */}
      <Button text="continue" onClick={console.log} altStyle={true} />
    </div>
  );
};

export default HomePage;
