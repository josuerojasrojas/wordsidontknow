const functions = require("firebase-functions");
const admin = require("firebase-admin");
const config = JSON.parse(process.env.FIREBASE_CONFIG || "{}");
config.databaseAuthVariableOverride = "functions-service-worker";
admin.initializeApp(functions.config().firebase);
const db = admin.database();

exports.initWordForUser = functions.database
  .ref("/users/{uid}/words/{word}")
  .onCreate((snapshot, context) => {
    const word = snapshot.key;
    const wordRef = db.ref(`words/${word}`);
    wordRef
      .once("value")
      .then((_wordSnap) => {
        //  if word doesn't exist then we cache it in our database
        // TODO: update when added definition api
        return _wordSnap.exists()
          ? ""
          : wordRef.set({ definition: "somedefin" });
      })
      .catch((e) => console.log("error", e));
    return db.ref(snapshot.ref).child("amount").set(1);
  });

exports.addAmountRepeatedWord = functions.database
  .ref("/users/{uid}/words/{word}/date")
  .onUpdate((changeSnapshot, context) => {
    const snapshot = changeSnapshot.before;
    return snapshot.ref.parent
      .child("amount")
      .once("value", (_snapshot) =>
        db.ref(_snapshot.ref).set(_snapshot.val() + 1)
      );
  });
