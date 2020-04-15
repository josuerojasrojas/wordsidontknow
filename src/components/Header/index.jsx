import React from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";
import Logo from "components/Logo";
import logoSrc from "assets/circle.svg";

const Header = ({ className }) => {
  return (
    <div className={classNames(className, styles.header)}>
      <Logo imageSrc={logoSrc} />
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
