import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import TextInput from "components/TextInput";
import styles from "./styles.module.css";
import Card from "components/Card";

const Init_Search_Description_Text =
  "Search for definitions and save them to study later";
const NO_RESULTS = "No results found, try making sure spelling is correct";
// random data
const getDefinitions = (value) => {
  const hasResult = Math.random();
  let defs = null;
  if (hasResult < 0.3) {
    defs = {
      closeWords: ["ss", "some", "something", "someone"],
    };
  } else if (hasResult < 0.6) {
    defs = {
      definitions: [
        "some definition one",
        "another defintion that is extra long cause definioitns are really long sometimes, tyou know what i'm saying or what. hmm. i wonder what is the average length of a definition",
      ],
    };
  }
  return defs;
};

const WordSearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  // timer state acts as a loader, if something is inside it that means it is loading.
  const [timerState, setTimerState] = useState(null);

  const onChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    clearTimeout(timerState);
    setTimerState(null);
    if (value.length) {
      setTimerState(
        setTimeout(() => {
          setSearchResults(getDefinitions(value));
          setTimerState(null);
        }, 100)
      );
    } else {
      setSearchResults(null);
    }
  };

  const getText = (searchValue, searchResult) => {
    switch (!!searchValue.length + !!searchResult) {
      case 0:
        return Init_Search_Description_Text;
      case 1:
        return NO_RESULTS;
      case 2:
        return "";
    }
  };

  const getResults = (searchResults) => {
    if (searchResults) {
      const resultComponents = [];
      console.log(searchResults);
      resultComponents.push(
        searchResults.definitions &&
          searchResults.definitions.map((def) => {
            return <div className={styles.definition}>{def}</div>;
          })
      );
      resultComponents.push(
        searchResults.closeWords &&
          searchResults.closeWords.map((word) => {
            return <div className={styles.otherWords}>{word}</div>;
          })
      );
      return resultComponents;
    } else return "";
  };

  const searchText = getText(searchValue, searchResults);

  return (
    <div>
      <Card>
        <TextInput
          className={styles.input}
          onChange={onChange}
          placeholder="Search words"
          value={searchValue}
        />
        <div className={styles.text}>{!timerState && searchText}</div>
        <div className={styles.results}>{getResults(searchResults)}</div>
      </Card>
    </div>
  );
};

export default WordSearchInput;