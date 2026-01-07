import React from "react";
import { Link, Outlet } from "react-router-dom";

const Courses = () => {
  return (
    <div>
      <div>
        <h1>Courses Page</h1>
        <h3>Sale is live!!! Sale is live!!! Sale is live!!!</h3>
      </div>
      <div>
        <Link to="/courses/coder">Coder Page</Link>
        <Link to="/courses/kodex">Kodex Page</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Courses;
