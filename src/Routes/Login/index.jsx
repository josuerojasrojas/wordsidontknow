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
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useContext(UserContext);

  const onSubmit = () => {
    setIsLoading(true);
    if (userLogin.email.length > 0 && userLogin.password.length) {
      auth
        .signInWithEmailAndPassword(userLogin.email, userLogin.password)
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
    isLoading || !(userLogin.email.length > 0 && userLogin.password.length);

  return (
    <div>
      <Card>
        <h3 className={styles.cardTitle}>Sign In</h3>
        <div className={styles.formWrapper}>
          <TextInput
            onChange={(e) =>
              setUserLogin({ ...userLogin, email: e.target.value })
            }
            placeholder="Email"
            type="email"
          />
          <TextInput
            onChange={(e) =>
              setUserLogin({ ...userLogin, password: e.target.value })
            }
            placeholder="Password"
            type="password"
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
