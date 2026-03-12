import React from "react";

const Pokemon3 = () => {
  return (
    <div>
      <div className="card">
        <div className="img">
          <img
            src="https://i.pinimg.com/736x/86/00/c9/8600c91c49146446785fefaa352b1720.jpg"
            alt=""
          />
        </div>
        <div className="details">
          <h3>
            Name: <span>Charmander</span>
          </h3>
          <p>
            It has a flame on its tail. The flame burns brighter when it is
            excited.
          </p>
          <h3>
            Type: <span>Blaze</span>
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

export default Pokemon3;



