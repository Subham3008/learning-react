import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="flex justify-between w-full bg-gray-900 px-10 py-4 text-gray-400 text-xl">
      <h1>LOGO</h1>
      <div className="flex justify-between gap-8">
        <NavLink
          className={({ isActive }) => (isActive ? "text-red-600" : "")}
          to={"/"}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "text-red-600" : "")}
          to={"/about"}
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "text-red-600" : "")}
          to={"/contact"}
        >
          Contact
        </NavLink>
      </div>
      <button>Sign up</button>
    </div>
  );
};

export default Navbar;
