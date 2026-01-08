import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext";

const Section = () => {
  const data = useContext(userDataContext)
  return (
    <div className="section">
      <h1>section</h1>
      <h2>{data}</h2>
    </div>
  );
};

export default Section;
