import React from "react";

const Card = (props) => {
  return (
    <div className="h-fit bg-white w-62.5 rounded-2xl p-1.5 relative">
      <div className="w-full">
        <img
          className="rounded-2xl"
          src="https://i.pinimg.com/736x/0b/81/7b/0b817b06ab120a4b6a768b39a479ab31.jpg"
          alt="img"
        />
      </div>
      <div className="bg-white h-25 w-25 rounded-full p-1.5 absolute top-26 left-18  shadow-xl/40">
        <img
          className="w-full h-full object-cover rounded-full"
          src={props.image}
          alt="Iron Man"
        />
      </div>
      <div className="text-black text-center flex flex-col gap-1 mt-13">
        <h2 className="text-xl font-bold">{props.name}</h2>
        <p className="text-sm">{props.role}</p>
        <p className="text-sm">{props.description}</p>
      </div>
      <div className="flex text-black mt-4 gap-8 justify-center rounded-2xl bg-gray-200 shadow-xl/30 py-3 px-4 mb-4 text-center">
        
      </div>
    </div>
  );
};

export default Card;
