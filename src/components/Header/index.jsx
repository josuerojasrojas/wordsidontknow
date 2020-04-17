import React from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";
import Logo from "components/Logo";
import logoSrc from "assets/circle.svg";
import { Link } from "react-router-dom";

const Header = ({ className }) => {
  return (
    <div className={classNames(className, styles.header)}>
      <Link to="/">
        <Logo imageSrc={logoSrc} />
      </Link>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
