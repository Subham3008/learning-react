import React from "react";
import { useState } from "react";

const Navbar = (props) => {
  const [newColor, setnewColor] = useState("");
  return (
    <div>
      <h1>This is navbar</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.getColor(newColor)
          setnewColor("");
        }}
      >
        <input
          type="text"
          placeholder="Enter your favorite color"
          value={newColor}
          onChange={(e) => {
            setnewColor(e.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Navbar;
