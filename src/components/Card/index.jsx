import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./styles.module.css";

const Card = ({ children, className, ...restProps }) => (
  <div className={classNames(classNames, styles.card)} {...restProps}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
