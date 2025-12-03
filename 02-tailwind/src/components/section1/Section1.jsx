import React from "react";
import Navbar from "./Navbar";
import Center from "./Center";

function Section1(props) {
  return (
    <div className="h-screen w-full">
      <Navbar />
      <Center users={props.users}/>
    </div>
  );
}

export default Section1;
