import React from "react";
import { Route, Routes } from "react-router";
import Home from "../screens/Home";
import About from "../screens/About";
import Contact from "../screens/Contact";
import Names from "../screens/Names";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/names/:name" element={<Names />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
