import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const CloseWord = ({ onClick, value }) => {
  const _onClick = () => onClick(value);
  return (
    <div onClick={_onClick} className={styles.otherWords}>
      {value}
    </div>
  );
};

CloseWord.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
};

export default CloseWord;
