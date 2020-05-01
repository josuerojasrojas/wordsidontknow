import React, { useContext, useState } from "react";
import TextInput from "components/TextInput";
import Button from "components/Button";
import Card from "components/Card";
import { UserContext } from "components/UserContext";
import { auth } from "_firebase.js";
import LogOutButton from "components/LogoutButton";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [emailInput, setEmailInput] = useState({
    value: "",
    hasError: false,
  });
  const [passwordInput, setPasswordInput] = useState({
    value: "",
    hasError: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useContext(UserContext);

  const onSubmit = () => {
    setIsLoading(true);
    if (emailInput.value.length && passwordInput.value.length) {
      auth
        .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then((_user) => {
          setUser({
            displayName: _user.displayName,
            email: _user.email,
            emailVerified: _user.emailVerified,
            photoURL: _user.photoURL,
            uid: _user.uid,
            ...user,
          });
          setIsLoading(false);
        })
        .catch((e) => {
          setErrorMessage(e.message);
          setIsLoading(false);
        });
    }
  };

  if (user.isAuthenticated) return <LogOutButton />;

  // TODO: should update with regex for email and password
  const isButtonDisabled =
    isLoading ||
    emailInput.hasError ||
    passwordInput.hasError ||
    !emailInput.value.length ||
    !passwordInput.value.length;

  return (
    <div>
      <Card>
        <h3 className={styles.cardTitle}>Sign In</h3>
        <div className={styles.formWrapper}>
          <TextInput
            onChange={(e) =>
              setEmailInput({
                ...emailInput,
                value: e.target.value,
                // TODO: could use regex or something to validate
                hasError: !e.target.value.length,
              })
            }
            placeholder="Email"
            type="email"
            value={emailInput.value}
            hasError={emailInput.hasError}
          />
          <TextInput
            hasError={passwordInput.hasError}
            onChange={(e) =>
              setPasswordInput({
                ...passwordInput,
                value: e.target.value,
                hasError: !e.target.value.length,
              })
            }
            placeholder="Password"
            type="password"
            value={passwordInput.value}
          />
          <Button
            className={styles.submitButton}
            onClick={onSubmit}
            text={"Sign In"}
            isDisabled={isButtonDisabled}
          />
          <div className={styles.errorMessage}>{errorMessage}</div>
          <div>
            Don't Have one? <Link to="/signup">Create a new one</Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
