import React, { useEffect, useState } from "react";
import { auth } from "_firebase.js";
import { USER_CONTEXT_INIT } from "constants/index";

const userContextInit = {
  user: null,
  setUser: () => {},
};

export const UserContext = React.createContext({ ...userContextInit });

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ ...USER_CONTEXT_INIT });

  useEffect(() => {
    // it may seem repetetive to have a onchange function
    auth.onAuthStateChanged((_user) => {
      if (_user) {
        setUser({
          displayName: _user.displayName,
          isAuthenticated: true,
          isUserReady: true,
          email: _user.email,
          emailVerified: _user.emailVerified,
          photoURL: _user.photoURL,
          uid: _user.uid,
        });
      } else {
        setUser({ ...USER_CONTEXT_INIT, isUserReady: true });
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
