import React from "react";

const Form = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
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
          type="text"
          placeholder="Enter your name"
          onChange={(e) => {
            console.log(e.target.value);
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
    </div>
  );
};

export default Form;
