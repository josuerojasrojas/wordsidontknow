import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";

const TextInput = ({ name, value, onChange, className, ...otherProps }) => {
  return (
    <label className={classNames(className, styles.input)} htmlFor={name}>
      {name}
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        {...otherProps}
      />
    </label>
  );
};

export default TextInput;
