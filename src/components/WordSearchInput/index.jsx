import React, { useState, useContext } from "react";
import classNames from "classnames";
import TextInput from "components/TextInput";
import styles from "./styles.module.css";
import Card from "components/Card";
import CloseWord from "components/CloseWord";
import {
  CLOSE_WORDS_RESULTS,
  DEFINITION_RESULTS,
  DICTIONARY_API,
  FIREBASE_SINGLE_WORD,
  FIREBASE_SINGLE_WORD_DEF,
  FIREBASE_USER_SINGLE_WORD_SET,
  Init_Search_Description_Text,
  IS_SEARCHING_TEXT,
  NO_RESULTS,
} from "constants/index";
import { database } from "_firebase";
import { UserContext } from "components/UserContext";

async function getDefinitions(value, setState, setTimerState) {
  let defs = null;

  // first try on firebase to get defs
  const firebaseWordSnapshot = await database
    .ref(FIREBASE_SINGLE_WORD_DEF(value))
    .once("value");
  const firebaseDefinition = firebaseWordSnapshot.val();
  if (firebaseDefinition) defs = { definitions: [firebaseDefinition] };
  // else if no defs found then fetch from DICTIONARY_API
  else {
    const results = await fetch(DICTIONARY_API(value));
    const reqResults = await results.json();
    if (reqResults && reqResults[0].shortdef) {
      defs = {
        definitions: [reqResults[0].shortdef],
      };
    } else if (reqResults.length) {
      defs = {
        closeWords: reqResults,
      };
    }
  }
  setTimerState(null);
  return setState(defs);
}

// random data
// gonna leave this here cause it might be useful if we run out of data from api
// const getDefinitions = async (value, setState, setTimerState) => {
//   const hasResult = Math.random();
//   let defs = null;
//   if (hasResult < 0.3) {
//     defs = {
//       closeWords: ["ss", "some", "something", "someone"],
//     };
//   } else if (hasResult < 0.6) {
//     defs = {
//       definitions: ["some definition one"],
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
  const [isAddWordDisabled, setIsAddWordDisabled] = useState(false);
  const { user } = useContext(UserContext);

  const onChange = (e) => {
    const value = typeof e === "string" ? e : e.target.value;
    setIsAddWordDisabled(false);
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
    if (isAddWordDisabled) return;
    const currDate = Date.now();
    setIsAddWordDisabled(true);
    database
      .ref(FIREBASE_USER_SINGLE_WORD_SET(user.uid, searchValue))
      .set(currDate)
      .then(() => {
        // TODO: should probably give a success message
        console.log("success added");
      })
      .catch((e) => {
        // TODO: should probably mention there was an error or something and to try again
        setIsAddWordDisabled(false);
        console.error(e);
      });
    database.ref(FIREBASE_SINGLE_WORD(searchValue)).set({
      // TODO: should update them later to have verb, nount, etc
      definition: searchResults.definitions[0],
      lastUpdated: currDate,
    });
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
          <div
            onClick={addToList}
            className={classNames(styles.addNew, {
              [styles.disabled]: isAddWordDisabled,
            })}
          >
            + Add this to your list
          </div>
        )}
      </Card>
    </div>
  );
};

export default WordSearchInput;
