import React from "react";

const Pokemon1 = () => {
  return (
    <div>
      <div className="card">
        <div className="img">
          <img
            src="https://i.pinimg.com/1200x/84/05/c0/8405c0801b19582f7fdaf274c3d3610f.jpg"
            alt=""
          />
        </div>
        <div className="details">
          <h3>
            Name: <span>Pikachu</span>
          </h3>
          <p>
            It has a flame on its tail. The flame burns brighter when it is
            excited.
          </p>
          <h3>
            Type: <span>Electric</span>
          </h3>
          <h3>
            Ability: <span>Static</span>
          </h3>
          <button className="btns">Add +</button>
        </div>
      </div>
    </div>
  );
};

export default Pokemon1;
