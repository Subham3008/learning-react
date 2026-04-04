import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProtectedDashboardRoutes = () => {
  let { loggedUser } = useContext(Auth);

  let user = JSON.parse(localStorage.getItem("logged user"));

  if (!loggedUser || !user) {
    toast.error("Unauthorized user!");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedDashboardRoutes;
