import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>THIS IS HOME PAGE</h1>
      <button
        onClick={() => {
          navigate("/product");
        }}
      >
        Explore All Products
      </button>
    </div>
  );
};

export default Home;
