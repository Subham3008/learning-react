import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <Outlet />
      AuthLayout
    </div>
  );
};

export default AuthLayout;
