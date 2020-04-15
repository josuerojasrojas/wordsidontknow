import React, { useContext, useState } from "react";
import TextInput from "components/TextInput";
import Button from "components/Button";
import { UserContext } from "components/UserContext";
import { auth } from "_firebase.js";

const Login = () => {
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const { user, setUser } = useContext(UserContext);

  const onSubmit = () => {
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
        })
        // TODO: should handle errors; maybe display them
        .catch(console.log);
    }
  };

  return (
    <div>
      <TextInput
        name="Email"
        onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
        placeholder="Enter your email"
        type="email"
      />
      <TextInput
        name="Password"
        onChange={(e) =>
          setUserLogin({ ...userLogin, password: e.target.value })
        }
        placeholder="Enter your password"
        type="password"
      />
      <Button onClick={onSubmit} text={"Sign In"} />
    </div>
  );
};

export default Login;
