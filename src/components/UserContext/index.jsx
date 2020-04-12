import React, { useState } from "react";

const userContextInit = {
  user: {},
  setUser: () => {},
};

export const UserContext = React.createContext({ ...userContextInit });

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: null,
    email: null,
    isAuthenticated: false,
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
