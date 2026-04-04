import { createContext, useState } from "react";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [regUser, setRegUser] = useState(
    JSON.parse(localStorage.getItem("reg users")) || [],
  );
  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <Auth.Provider value={{ regUser, setRegUser, loggedUser, setLoggedUser }}>
      {children}
    </Auth.Provider>
  );
};
