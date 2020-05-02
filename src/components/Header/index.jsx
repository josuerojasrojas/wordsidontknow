import React, { useState } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";
import Logo from "components/Logo";
import logoSrc from "assets/circle.svg";
import { Link } from "react-router-dom";
import HamburgerButton from "components/HamburgerButton";

const Header = ({ className }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className={classNames(className, styles.header)}>
      <Link to="/">
        <Logo imageSrc={logoSrc} />
      </Link>
      <HamburgerButton
        toggle={toggle}
        onClick={() => {
          setToggle(!toggle);
        }}
      />
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
