import React, { useState, useContext } from "react";
import classNames from "classnames";
import TextInput from "components/TextInput";
import styles from "./styles.module.css";
import Card from "components/Card";
import CloseWord from "components/CloseWord";
import {
  CLOSE_WORDS_RESULTS,
  DEFAULT_MESSAGE,
  DEFINITION_RESULTS,
  DICTIONARY_API,
  FIREBASE_SINGLE_WORD_DEF,
  FIREBASE_SINGLE_WORD,
  FIREBASE_USER_SINGLE_WORD_SET,
  Init_Search_Description_Text,
  IS_SEARCHING_TEXT,
  NO_RESULTS,
} from "constants/index";
import { database } from "_firebase";
import { UserContext } from "components/UserContext";

async function getDefinitions(_value, setState, setTimerState) {
  const value = _value.toLowerCase();
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
    if (reqResults.length && reqResults[0].shortdef) {
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

const WordSearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  // timer state acts as a loader, if something is inside it that means it is loading.
  const [timerState, setTimerState] = useState(null);
  const [isAddWordDisabled, setIsAddWordDisabled] = useState(false);
  const { user } = useContext(UserContext);
  const [addWordMsg, setAddWordMsg] = useState(DEFAULT_MESSAGE);

  const onChange = (e) => {
    const value = typeof e === "string" ? e : e.target.value;
    setAddWordMsg(DEFAULT_MESSAGE);
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
    const word = searchValue.toLowerCase();
    setIsAddWordDisabled(true);
    database
      .ref(FIREBASE_USER_SINGLE_WORD_SET(user.uid, word))
      .set(currDate)
      .then(() => {
        // TODO: should probably give a success message
        setAddWordMsg({ isError: false, message: "success added" });
      })
      .catch((e) => {
        // TODO: should probably mention there was an error or something and to try again
        setIsAddWordDisabled(false);
        setAddWordMsg({
          isError: true,
          message: "Something went wrong. Try again.",
        });
      });
    database.ref(FIREBASE_SINGLE_WORD(word)).set({
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
          searchResults.definitions.map((def, i) => (
            <div key={i} className={styles.definition}>
              {typeof def === "string"
                ? def
                : def.map((d, j) => (
                    <p>
                      {j + 1}. {d}
                    </p>
                  ))}
            </div>
          ))
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
              [styles.addWordError]: addWordMsg.isError,
            })}
          >
            {addWordMsg.message}
          </div>
        )}
      </Card>
    </div>
  );
};

export default WordSearchInput;
