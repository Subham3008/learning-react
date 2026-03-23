import React, { useState } from "react";
import Navbar from "./components/Navbar";
import UserCard from "./components/UserCard";
import UserForm from "./components/UserForm";

const App = () => {
  const [toggle, setToggle] = useState(true);
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [],
  );
  const [editUsers, setEditUsers] = useState(null);

  // console.log(users);
  // console.log(editUsers);

  {
    /*Delete user */
  }
  const handleDelete = (id) => {
    let updatedUser = users.filter((user) => {
      return user.id !== id;
    });
    setUsers(updatedUser);
    localStorage.setItem("users", JSON.stringify(updatedUser));
  };

  return (
    <div className="h-screen bg-gray-700 ">
      <Navbar toggle={toggle} setToggle={setToggle} />
      {toggle ? (
        <UserForm
          setUsers={setUsers}
          setToggle={setToggle}
          editUsers={editUsers}
          setEditUsers={setEditUsers}
          users={users}
        />
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 p-6 bg-gray-700 ">
          {users.map((elem) => {
            return (
              <UserCard
                key={elem.id}
                user={elem}
                handleDelete={handleDelete}
                setEditUsers={setEditUsers}
                setToggle={setToggle}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
