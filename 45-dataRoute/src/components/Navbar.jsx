import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="flex justify-between">
      <h1>LOGO</h1>
      <div className="flex gap-4">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/contact"}>Contact</NavLink>
      </div>
      <h1>User</h1>
    </div>
  );
};

export default Navbar;
