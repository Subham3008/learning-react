import React, { createContext } from "react";
export const userDataContext = createContext();
const UserContext = (props) => {
  const user = 'SUBHAM'
  return <userDataContext.Provider value={user}>{props.children}</userDataContext.Provider>
};

export default UserContext;
