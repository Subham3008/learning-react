import React from "react";

const Pokemon4 = () => {
  return (
    <div>
      <div className="card">
        <div className="img">
          <img
            src="https://i.pinimg.com/736x/b8/19/16/b81916ac09af0b6db5bbd8c0d3e9d862.jpg"
            alt=""
          />
        </div>
        <div className="details">
          <h3>
            Name: <span>Eevee</span>
          </h3>
          <p>
            Its genetic code is irregular. It may mutate if exposed to radiation
            from elemental stones.
          </p>
          <h3>
            Type: <span>Normal</span>
          </h3>
          <h3>
            Ability: <span>Run Away</span>
          </h3>
          <button className="btns">Add +</button>
        </div>
      </div>
    </div>
  );
};

export default Pokemon4;
