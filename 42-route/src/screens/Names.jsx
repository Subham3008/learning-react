import React from "react";
import { useParams } from "react-router";

const Names = () => {
  let { name } = useParams();

  return <div>{name}</div>;
};

export default Names;
