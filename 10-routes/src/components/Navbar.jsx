import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left">
        <h2>NAVBAR</h2>
      </div>
      <div className="right">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/product">Product</Link>
        <Link to="/courses">Courses</Link>
      </div>
    </div>
  );
};

export default Navbar;
