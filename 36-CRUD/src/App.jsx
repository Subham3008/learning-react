import React, { useState } from "react";
import Navbar from "./components/Navbar";
import UserCard from "./components/UserCard";
import UserForm from "./components/UserForm";

const App = () => {
  const [toggle, setToggle] = useState(true);
  const [users, setUsers] = useState([]);
  console.log(users);

  {
    /*Delete user */
  }
  const handleDelete = (id) => {
    let updatedUser = users.filter((user) => {
      return user.empId !== id;
    });
    setUsers(updatedUser);
  };

  return (
    <div className="h-screen bg-gray-700 ">
      <Navbar toggle={toggle} setToggle={setToggle} />
      {toggle ? (
        <UserForm setUsers={setUsers} />
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 p-6 bg-gray-700 ">
          {users.map((elem) => {
            return <UserCard key={elem.empId} user={elem} handleDelete={handleDelete}/>;
          })}
        </div>
      )}
    </div>
  );
};

export default App;
