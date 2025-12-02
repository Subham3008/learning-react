import React from "react";

function Card(props) {
  return (
    <div className="card">
      <div className="top">
        <img src={props.image} alt="" />
      </div>
      <div className="mid">
        <h1>{props.name}</h1>
        <h3>{props.job}</h3>
        <p>{props.description}</p>
      </div>
      <div className="bottom">
        <button>Follow +</button>
      </div>
    </div>
  );
}

export default Card;
