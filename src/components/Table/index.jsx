import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./styles.module.css";
import Card from "components/Card";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatDate = (date) => {
  // try to parse integer cause firebase data is like dat!
  const dateNumber = parseInt(date);
  let dateObj = "";
  if (Number.isInteger(dateNumber)) {
    dateObj = new Date(dateNumber);
  }
  // else just try to get date a dateobj
  else dateObj = new Date(date).toString();
  if (dateObj.toString() !== "Invalid Date")
    return `${
      months[dateObj.getMonth()]
    } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
  else return dateObj.toString();
};

// a row is created base on the data from firebase for example a rowdata = {someword: {amount: 10, date: 102920332}}
const Row = ({ className, fields, formatter, onlyFields, word, wordData }) => {
  return (
    <div
      className={classNames(className, styles.row, {
        [styles.titleRow]: onlyFields,
      })}
    >
      <div className={styles.cell}>{onlyFields ? "word" : word}</div>
      {fields.map((field, i) => (
        <div key={i} className={styles.cell}>
          {onlyFields
            ? field
            : formatter[field]
            ? formatter[field](wordData[field])
            : wordData[field]}
        </div>
      ))}
    </div>
  );
};

Row.propTypes = {
  className: PropTypes.string,
  fields: PropTypes.array,
  formatter: PropTypes.object,
  onlyFields: PropTypes.bool,
  word: PropTypes.string,
  wordData: PropTypes.object,
};

const Table = ({ columns, data, formatter }) => {
  if (!data) return <Card>No Stats found</Card>;
  return (
    <Card className={styles.table}>
      <Row className={styles.topRow} onlyFields={true} fields={columns}></Row>
      {Object.keys(data).map((word, index) => (
        <Row
          key={index}
          word={word}
          wordData={data[word]}
          fields={columns}
          formatter={formatter}
        ></Row>
      ))}
    </Card>
  );
};

Table.defaultProps = {
  columns: ["amount", "date"],
  formatter: { date: formatDate },
};

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.object,
  formatter: PropTypes.object,
  //   data is weird, really want to use typescript to avoid surprises
  //   useKeyAsColumn: PropTypes.bool,
};

export default Table;
