import { createContext, useEffect, useState } from "react";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [regUser, setRegUser] = useState(
    JSON.parse(localStorage.getItem("reg users")) || [],
  );
  const [loggedUser, setLoggedUser] = useState(null);

  // 🔹 sync from localStorage on app start
  useEffect(() => {
    try {
      const data = localStorage.getItem("logged user");
      if (data) {
        setLoggedUser(JSON.parse(data));
      }
    } catch {
      setLoggedUser(null);
    }
  }, []);

  return (
    <Auth.Provider value={{ regUser, setRegUser, loggedUser, setLoggedUser }}>
      {children}
    </Auth.Provider>
  );
};
