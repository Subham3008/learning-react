import { createContext, useContext, useMemo, useState } from "react";
import authService from "../../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => authService.getSession());

  const login = async (payload) => {
    const nextSession = await authService.login(payload);
    setSession(nextSession);
    return nextSession;
  };

  const register = async (payload) => {
    const nextSession = await authService.register(payload);
    setSession(nextSession);
    return nextSession;
  };

  const logout = () => {
    authService.logout();
    setSession(null);
  };

  const value = useMemo(
    () => ({
      user: session?.user || null,
      token: session?.token || null,
      isAuthenticated: Boolean(session?.token),
      login,
      register,
      logout,
    }),
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
