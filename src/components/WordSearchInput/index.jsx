import React, { useState } from "react";
import PropTypes from "prop-types";
import TextInput from "components/TextInput";
import styles from "./styles.module.css";
import Card from "components/Card";
import {
  CLOSE_WORDS_RESULTS,
  DEFINITION_RESULTS,
  DICTIONARY_API,
  Init_Search_Description_Text,
  IS_SEARCHING_TEXT,
  NO_RESULTS,
} from "constants/index";

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

async function getDefinitions(value, setState, setTimerState) {
  const results = await fetch(DICTIONARY_API(value));
  const reqResults = await results.json();
  let defs = null;
  if (reqResults && reqResults[0].shortdef) {
    defs = {
      definitions: [reqResults[0].shortdef],
    };
  } else if (reqResults.length) {
    defs = {
      closeWords: reqResults,
    };
  }
  setTimerState(null);
  return setState(defs);
}

// random data
// gonna leave this here cause it might be useful if we run out of data from api
// const getDefinitions = (value, setState, setTimerState) => {
//   const hasResult = Math.random();
//   let defs = null;
//   if (hasResult < 0.3) {
//     defs = {
//       closeWords: ["ss", "some", "something", "someone"],
//     };
//   } else if (hasResult < 0.6) {
//     defs = {
//       definitions: [
//         "some definition one",
//         "another defintion that is extra long cause definitions are really long sometimes, tyou know what i'm saying or what. hmm. i wonder what is the average length of a definition",
//       ],
//     };
//   }
//   setTimerState(null);
//   return setState(defs);
// };

const WordSearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  // timer state acts as a loader, if something is inside it that means it is loading.
  const [timerState, setTimerState] = useState(null);

  const onChange = (e) => {
    const value = typeof e === "string" ? e : e.target.value;
    setSearchValue(value);
    clearTimeout(timerState);
    setTimerState(null);
    if (value.length) {
      setTimerState(
        setTimeout(() => {
          getDefinitions(value, setSearchResults, setTimerState);
        }, 300)
      );
    } else {
      setSearchResults(null);
    }
  };

  const addToList = () => {
    //   TODO:
    console.log(
      `should add ${searchValue}: ${searchResults.definitions} to list`
    );
  };

  const getText = (searchValue, searchResult) => {
    if (timerState) return IS_SEARCHING_TEXT;
    else if (!searchValue.length) return Init_Search_Description_Text;
    else if (!searchResult) return NO_RESULTS;
    else if (!!searchResults.definitions)
      return DEFINITION_RESULTS(searchValue);
    else if (!!searchResults.closeWords)
      return CLOSE_WORDS_RESULTS(searchValue);
  };

  const getResults = (searchResults) => {
    if (searchResults) {
      const resultComponents = [];
      resultComponents.push(
        searchResults.definitions &&
          searchResults.definitions.map((def, i) => {
            return (
              <div key={i} className={styles.definition}>
                {def}
              </div>
            );
          })
      );
      resultComponents.push(
        searchResults.closeWords &&
          searchResults.closeWords.map((word) => {
            return <CloseWord key={word} onClick={onChange} value={word} />;
          })
      );
      return resultComponents;
    } else return "";
  };

  return (
    <div>
      <Card>
        <TextInput
          className={styles.input}
          onChange={onChange}
          placeholder="Search words"
          value={searchValue}
        />
        <div className={styles.text}>{getText(searchValue, searchResults)}</div>
        <div className={styles.results}>
          {!timerState && getResults(searchResults)}
        </div>
        {!timerState && !!searchResults && !!searchResults.definitions && (
          <div onClick={addToList} className={styles.addNew}>
            + Add this to your list
          </div>
        )}
      </Card>
    </div>
  );
};

export default WordSearchInput;
