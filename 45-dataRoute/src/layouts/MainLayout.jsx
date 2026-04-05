import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4"><Outlet /></div>
    </div>
  );
};

export default MainLayout;
