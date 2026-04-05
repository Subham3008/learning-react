import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { Auth } from "../context/AuthContext";

const ProtectedDashboardRoutes = () => {
  const { loggedUser, loading } = useContext(Auth);

  if (loading) {
    return <h1>Loading...</h1>; // ya spinner
  }

  // 🔐 Only check context
  if (!loggedUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedDashboardRoutes;
