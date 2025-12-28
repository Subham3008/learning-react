import React from "react";
import { useState } from "react";
import Card from "./Card";

const Form = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [allUser, setallUser] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    const newUser = [...allUser];
    newUser.push({ name, role, description, imageUrl });
    setallUser(newUser);
    // console.log(newUser)
    setName("");
    setDescription("");
    setRole("");
    setImageUrl("");
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <input
          type="text"
          placeholder="Enter your name"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter your role"
          required
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter your Description"
          required
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Paste image url"
          required
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
        />
        <button>Submit</button>
      </form>
      <div>
        {allUser.map(function(e,idx){
          return <Card key={idx} name={e.name} role={e.role} description={e.description} image={e.imageUrl}/>
        })}
      </div>
    </div>
  );
};

export default Form;
