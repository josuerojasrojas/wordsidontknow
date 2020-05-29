import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

const TextInput = ({
  className,
  hasError,
  clear,
  name,
  onChange,
  onEnter,
  type,
  value,
  ...otherProps
}) => {
  const onKeyPress = (e) => e.key === "Enter" && onEnter && onEnter(e);

  return (
    <label
      className={classNames(className, styles.input, {
        [styles.hasError]: hasError,
        [styles.hasClear]: clear && value.length,
      })}
      htmlFor={name}
    >
      {name}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        {...otherProps}
      />
      {clear && <div className={styles.clear} onClick={clear}></div>}
    </label>
  );
};

TextInput.defaultProps = {
  type: "text",
};

TextInput.propTypes = {
  className: PropTypes.string,
  clear: PropTypes.func,
  hasError: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default TextInput;
