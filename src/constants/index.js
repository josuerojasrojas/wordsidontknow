// file for all constant variables
export const redirectTo = "/login";

// probably bad to have the key, but it's just reading for definitions and i couldnt use it in functions cause we are using a free plan that doesn't allow outside request
const dictionaryapikey = "b1c304cc-b5e7-4598-a98b-529b72f5d6a9";
export const DICTIONARY_API = (word) =>
  `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${dictionaryapikey}`;

// firebase 'endpoint'
export const FIREBASE_ALL_WORDS = "/words";
export const FIREBASE_USER_WORDS = (uid) => `${uid}/words`;
