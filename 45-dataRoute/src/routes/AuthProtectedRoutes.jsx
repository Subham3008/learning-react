import React, { useContext } from "react";
import { Auth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

const AuthProtectedRoutes = () => {
  let { loggedUser } = useContext(Auth);
  let user = JSON.parse(localStorage.getItem("logged user"));

  if (loggedUser || user) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default AuthProtectedRoutes;
