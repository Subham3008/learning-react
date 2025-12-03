import React from "react";
import RightCardContent from "./RightCardContent";

function RightCard(props) {
  return (
    <div className="h-full w-70 rounded-4xl relative shrink-0 overflow-hidden">
      <img className=" h-full w-full object-cover" src={props.img} alt="img" />
      <RightCardContent id={props.id} tag={props.tag} color={props.color}/>
    </div>
  );
}

export default RightCard;
