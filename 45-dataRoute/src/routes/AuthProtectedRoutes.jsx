import { useContext } from "react";
import { Auth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

const AuthProtectedRoutes = () => {
  const { loggedUser } = useContext(Auth);

  // 🔁 redirect if already logged in
  if (loggedUser) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ allow access to login/register
  return <Outlet />;
};

export default AuthProtectedRoutes;
