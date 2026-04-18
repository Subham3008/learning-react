import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicRoutes = () => {
  const { isAuthenticate, isLoading } = useSelector((store) => store.auth);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isAuthenticate) {
    return <Navigate to={"/main"} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PublicRoutes;
