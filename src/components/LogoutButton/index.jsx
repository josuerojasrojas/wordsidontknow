import React, { useContext } from "react";
import PropTypes from "prop-types";
import { UserContext } from "components/UserContext";
import { auth } from "_firebase";
import { USER_CONTEXT_INIT } from "constants/index";
import Button from "components/Button";

const LogOutButton = ({ children }) => {
  const { setUser } = useContext(UserContext);

  const logout = () => {
    auth
      .signOut()
      .then(() => setUser(...USER_CONTEXT_INIT))
      .catch((e) => console.log("error: logout button: ", e));
  };

  return <div onClick={logout}>{children}</div>;
};

LogOutButton.defaultProps = {
  children: <Button text="Log Out" />,
};

LogOutButton.propTypes = {
  children: PropTypes.node,
};

export default LogOutButton;
