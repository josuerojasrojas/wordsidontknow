import React, { useEffect, useState } from "react";
import { auth } from "_firebase.js";

const userContextInit = {
  user: null,
  setUser: () => {},
};

export const UserContext = React.createContext({ ...userContextInit });

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ isUserReady: false });

  useEffect(() => {
    auth.onAuthStateChanged((_user) => {
      if (_user) {
        setUser({
          displayName: _user.displayName,
          isUserReady: true,
          email: _user.email,
          emailVerified: _user.emailVerified,
          photoURL: _user.photoURL,
          uid: _user.uid,
        });
      } else {
        setUser({
          isUserReady: true,
        });
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
