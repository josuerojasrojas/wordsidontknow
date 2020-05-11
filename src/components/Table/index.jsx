import React, { useState, useEffect } from "react";
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

const compare = (a, b) => {
  if (isNaN(a) && isNaN(b)) {
    // compare strings
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  } else {
    console.log('here compare', a - b)
    return a - b;
  }
}

// Passed in asc to determine ascending order.
const sortValues = (colName, words, asc = true) => {
  return [...words.sort((a, b) => {
    return asc ? (compare(a[colName], b[colName])) : (compare(b[colName], a[colName]))
  })]
}

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
const Row = ({ className, fields, formatter, onlyFields, wordData, onClick }) => {
  return (
    <div
      className={classNames(className, styles.row, {
        [styles.titleRow]: onlyFields,
      })}
    >
      {fields.map((field, i) => (
        <div key={i} className={styles.cell} onClick={() => { onClick(field) }}>
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

Row.defaultProps = {
  onClick: () => { }
}

Row.propTypes = {
  className: PropTypes.string,
  fields: PropTypes.array,
  formatter: PropTypes.object,
  onlyFields: PropTypes.bool,
  word: PropTypes.string,
  wordData: PropTypes.object,
};

const Table = ({ columns, data, formatter }) => {

  const [wordOrder, setWordOrder] = useState([]);
  const [isColname, setIsColname] = useState("word");

  useEffect(() => {
    if (data) {

      let words = [];

      for (const word in data) {
        words.push({ word, ...data[word] });
      }
      setWordOrder(sortValues("word", words));
    }
  }, [data]);

  if (!data) return <Card>No Stats found</Card>;

  const sortByColumn = (colName) => {

    setWordOrder(sortValues(colName, wordOrder, !(isColname === colName)))

    setIsColname(isColname === colName ? "" : colName)
  }

  return (
    <Card className={styles.table}>
      <Row className={styles.topRow} onlyFields={true} fields={columns} onClick={sortByColumn}></Row>
      {wordOrder.map((values, index) => (
        <Row
          key={index}
          wordData={values}
          fields={columns}
          formatter={formatter}
        ></Row>
      ))}
    </Card>
  );
};

Table.defaultProps = {
  columns: ["word", "amount", "date"],
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
