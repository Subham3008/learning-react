import React from "react";

const Pokemon1 = ({pokemon}) => {
  return (
    <div>
      <div className="card">
        <div className="img">
          <img
            src={pokemon.image}
            alt="img"
          />
        </div>
        <div className="details">
          <h3>
            Name: <span>{pokemon.name}</span>
          </h3>
          <p>
            {pokemon.description}
          </p>
          <h3>
            Type: <span>{pokemon.type}</span>
          </h3>
          <h3>
            Ability: <span>{pokemon.ability}</span>
          </h3>
          <button className="btns">Add +</button>
        </div>
      </div>
    </div>
  );
};

export default Pokemon1;
