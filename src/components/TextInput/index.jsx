import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

const TextInput = ({
  className,
  name,
  onChange,
  type,
  value,
  ...otherProps
}) => {
  return (
    <label className={classNames(className, styles.input)} htmlFor={name}>
      {name}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        {...otherProps}
      />
    </label>
  );
};

TextInput.defaultProps = {
  type: "text",
};

TextInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default TextInput;
