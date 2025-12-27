import React, { useState } from "react";

const App = () => {
  const [num, setnum] = useState(0);
  return (
    <div className="counter">
      <h1>{num}</h1>
      <div className="btn">
        <button
          onClick={() => {
            {
              setnum(num + 1);
            }
          }}
        >
          Increase
        </button>
        <button
          onClick={() => {
            {
              setnum(num - 1);
            }
          }}
        >
          Decrease
        </button>
      </div>
    </div>
  );
};

export default App;
