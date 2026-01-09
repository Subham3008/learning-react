import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <h1>THIS IS HOME PAGE</h1>
      <button
        className="homeBtn"
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
