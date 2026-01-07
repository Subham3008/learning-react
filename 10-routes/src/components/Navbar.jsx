import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left">
        <h2>NAVBAR</h2>
      </div>
      <div className="right">
        <NavLink
          to="/"
          style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
        >
          Contact
        </NavLink>
        <NavLink
          to="/product"
          style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
        >
          Product
        </NavLink>
        <NavLink
          to="/courses"
          style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
        >
          Courses
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
