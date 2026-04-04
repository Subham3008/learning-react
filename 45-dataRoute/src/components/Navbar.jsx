import React, { useContext } from "react";
import { NavLink } from "react-router";
import { Auth } from "../context/AuthContext";

const Navbar = () => {
  const { setLoggedUser } = useContext(Auth);
  return (
    <div className="flex justify-between items-center py-2 px-4 bg-gray-100 border-b">
      <h1 className="font-bold">LOGO</h1>

      <div className="flex gap-4">
        <NavLink to="/dashboard">Home</NavLink>
        <NavLink to="/dashboard/about">About</NavLink>
        <NavLink to="/dashboard/contact">Contact</NavLink>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("logged user");
          setLoggedUser(null);
        }}
        className="bg-gray-900 text-gray-200 px-4 py-2 rounded-xl cursor-pointer active:scale-[0.95] transition-all"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
