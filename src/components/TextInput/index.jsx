import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";

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

export default TextInput;
