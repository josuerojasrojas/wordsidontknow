import React, { useState, useContext } from "react";
import TextInput from "components/TextInput";
import Button from "components/Button";
import Card from "components/Card";
import { UserContext } from "components/UserContext";
import { auth } from "_firebase.js";
import LogOutButton from "components/LogoutButton";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
    rePassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useContext(UserContext);

  const onSubmit = () => {
    setIsLoading(true);
    if (userLogin.password !== userLogin.rePassword) {
      setErrorMessage("Passwords don't match.");
      setIsLoading(false);
    } else if (
      userLogin.email.length &&
      userLogin.password.length &&
      userLogin.password === userLogin.rePassword
    ) {
      auth
        .createUserWithEmailAndPassword(userLogin.email, userLogin.password)
        .catch((e) => {
          setErrorMessage(e.message);
          setIsLoading(false);
        });
    } else {
      setErrorMessage("Something went Wrong.");
      setIsLoading(false);
    }
  };

  if (user.isAuthenticated) return <LogOutButton />;

  // TODO: should update with regex for email and password
  const isButtonDisabled =
    isLoading ||
    !(
      userLogin.email.length &&
      userLogin.password.length &&
      userLogin.rePassword.length
    );

  return (
    <div>
      <Card>
        <h3 className={styles.cardTitle}>Create a New Account</h3>
        <div className={styles.formWrapper}>
          <TextInput
            onChange={(e) =>
              setUserLogin({ ...userLogin, email: e.target.value })
            }
            placeholder="Email"
            type="email"
            value={user.email}
          />
          <TextInput
            autoComplete="off"
            onChange={(e) =>
              setUserLogin({ ...userLogin, password: e.target.value })
            }
            placeholder="Password"
            required
            type="password"
            value={user.password}
          />
          <TextInput
            autoComplete="off"
            onChange={(e) =>
              setUserLogin({ ...userLogin, rePassword: e.target.value })
            }
            placeholder="Re-Enter Password"
            required
            type="password"
            value={user.rePassword}
          />
          <Button
            className={styles.submitButton}
            onClick={onSubmit}
            text={"Sign Up"}
            isDisabled={isButtonDisabled}
          />
          <div className={styles.errorMessage}>{errorMessage}</div>
          <div>
            Already have an account? <Link to="/login">Login Here</Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;
