import React from "react";
import { useNavigate } from "react-router";

const Home = () => {
  let data = [
    {
      id: 1,
      name: "sanu",
    },
    {
      id: 2,
      name: "subham",
    },
    {
      id: 3,
      name: "suvo",
    },
  ];
  let navigate = useNavigate();

  return (
    <div className="flex gap-4 text-xl">
      {data.map((elem) => {
        return (
          <h1 key={elem.id} onClick={() => navigate(`/names/${elem.name}`)}>
            {elem.name}
          </h1>
        );
      })}
    </div>
  );
};

export default Home;
