import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { Auth } from "../context/AuthContext";

const ProtectedDashboardRoutes = () => {
  const { loggedUser } = useContext(Auth);

  // 🔐 Only check context
  if (!loggedUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedDashboardRoutes;
