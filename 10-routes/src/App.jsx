import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import Kodex from "./pages/Kodex";
import Coder from "./pages/Coder";
import AboutSomthing from "./pages/AboutSomthing";
import Product from "./pages/Product";
import AnyProduct from "./pages/AnyProduct";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<Product />} />
        <Route path="/courses" element={<Courses />} />

        {/* Dynamic Route */}
        <Route path="/about/:id" element={<AboutSomthing />} />
        <Route path="/product/:id" element={<AnyProduct />} />

        {/* Not Found Route */}
        <Route path="/*" element={<NotFound />} />

        {/* Nested Route */}
        <Route path="/courses/kodex" element={<Kodex />} />
        <Route path="/courses/coder" element={<Coder />} />
      </Routes>
    </div>
  );
};

export default App;
