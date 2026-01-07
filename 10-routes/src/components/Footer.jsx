import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="foot">
      <h1>Footer</h1>
      <button
        onClick={() => {
          navigate("/courses");
        }}
      >
        Explore Courses
      </button>
    </div>
  );
};

export default Footer;
