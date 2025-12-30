import { useState } from "react";

const Form = ({ allUser, setAllUser}) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const newUser = [...allUser];
    newUser.push({ name, role, description, imageUrl });
    setAllUser(newUser);
    // setAllUser([...allUser, { name, role, description, imageUrl }]);
    localStorage.setItem('all-user', JSON.stringify(newUser))

    setName("");
    setDescription("");
    setRole("");
    setImageUrl("");
  };
  return (
    <div>
      <form
        className="flex flex-col w-full h-full gap-3 bg-blue-100 items-center rounded- shadow-2xl rounded-2xl"
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <input
          className="border-emerald-700 border-2 text-xl font-semibold px-5 py-2 rounded m-2 w-[65%]"
          type="text"
          placeholder="Enter your name"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          className="border-emerald-700 border-2 text-xl font-semibold px-5 py-2 rounded m-2 w-[65%]"
          type="text"
          placeholder="Enter your role"
          required
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
        />
        <input
          className="border-emerald-700 border-2 text-xl font-semibold px-5 py-2 rounded m-2 w-[65%]"
          type="text"
          placeholder="Enter your description"
          required
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          className="border-emerald-700 border-2 text-xl font-semibold px-5 py-2 rounded m-2 w-[65%]"
          type="text"
          placeholder="Paste image url"
          required
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
        />
        <button className="px-5 py-2 text-xl active:scale-95 cursor-pointer bg-emerald-600 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
