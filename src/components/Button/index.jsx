import React from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import PropTypes from "prop-types";

const Button = ({ altStyle, className, isDisabled, onClick, text }) => {
  const _onClick = (e) => {
    if (!isDisabled) return onClick && onClick(e);
  };

  return (
    <div
      className={classNames(className, styles.button, {
        [styles.altStyle]: altStyle,
        [styles.disabled]: isDisabled,
      })}
      onClick={_onClick}
    >
      {text}
    </div>
  );
};

Button.propTypes = {
  altStyle: PropTypes.bool,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
};

export default Button;
