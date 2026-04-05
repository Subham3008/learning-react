import { createContext, useEffect, useState } from "react";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [regUser, setRegUser] = useState(
    JSON.parse(localStorage.getItem("reg users")) || [],
  );
  const [loggedUser, setLoggedUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // 🔹 sync from localStorage on app start & manage setLoading state
  useEffect(() => {
    const data = localStorage.getItem("logged user");
    if (data) {
      setLoggedUser(JSON.parse(data));
    }
    setLoading(false); // ✅ important
  }, []);

  // 🔹 sync from localStorage on app start

  return (
    <Auth.Provider
      value={{ regUser, setRegUser, loggedUser, setLoggedUser, loading }}
    >
      {children}
    </Auth.Provider>
  );
};
