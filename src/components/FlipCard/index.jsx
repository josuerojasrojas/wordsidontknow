import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./styles.module.css";
import Card from "components/Card";

const FlipCard = ({ frontContent, backContent }) => {
  const [flip, setflip] = useState(true);

  const flipCard = () => {
    setflip(!flip);
  };

  return (
    <Card
      onClick={flipCard}
      className={classNames(styles.card, { [styles.backFlip]: !flip })}
    >
      {flip ? (
        <div className={styles.frontContent}>{frontContent}</div>
      ) : (
        <div className={styles.backContent}>{backContent}</div>
      )}
    </Card>
  );
};

FlipCard.propTypes = {
  frontContent: PropTypes.node,
  backContent: PropTypes.node,
};

export default FlipCard;
