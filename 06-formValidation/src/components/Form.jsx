import React from "react";
import { useState } from "react";

const Form = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [allUsers, setallUsers] = useState([]);
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(username);
    const newAllUsers = [...allUsers];
    newAllUsers.push({ username, email });
    console.log(newAllUsers);
    setallUsers(newAllUsers);
    setusername("");
    setemail("");
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="bg-gray-300 flex flex-col items-center gap-4 justify-center w-62.5 p-4 rounded-xl"
      >
        <input
          value={username}
          type="text"
          placeholder="Enter your name"
          required
          onChange={(e) => {
            setusername(e.target.value);
          }}
        />
        <input
          value={email}
          type="text"
          placeholder="Enter your email"
          required
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <button
          className="bg-blue-500 
  text-white 
  px-4 py-2 
  rounded 
  active:bg-blue-700"
        >
          Submit
        </button>
      </form>
      {allUsers.map(function (elem, idx) {
        return (
          <div key={idx}>
            <h4>{elem.username}</h4>
            <h4>{elem.email}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Form;
