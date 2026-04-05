import React, { useContext, useMemo } from "react";
import { Auth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

const AuthProtectedRoutes = () => {
  const { loggedUser } = useContext(Auth);

  // 🔐 safe + optimized localStorage read
  const user = useMemo(() => {
    try {
      const data = localStorage.getItem("logged user");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }, []);

  // 🔁 redirect if already logged in
  if (loggedUser || user) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ allow access to login/register
  return <Outlet />;
};

export default AuthProtectedRoutes;
