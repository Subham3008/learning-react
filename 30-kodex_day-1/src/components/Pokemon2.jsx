import React from "react";

const Pokemon2 = () => {
  return (
    <div>
      <div className="card">
        <div className="img">
          <img
            src="https://i.pinimg.com/736x/7a/47/1d/7a471d7a4d788d75d8fbd395e50ba082.jpg"
            alt=""
          />
        </div>
        <div className="details">
          <h3>
            Name: <span>Bulbasaur</span>
          </h3>
          <p>
            A strange seed was planted on its back at birth. The plant sprouts
            and grows with this Pokémon.
          </p>
          <h3>
            Type: <span>Grass / Poison</span>
          </h3>
          <h3>
            Ability: <span>Overgrow</span>
          </h3>
          <button className="btns">Add +</button>
        </div>
      </div>
    </div>
  );
};

export default Pokemon2;
