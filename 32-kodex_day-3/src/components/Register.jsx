import React from "react";

const Register = ({setToggle}) => {
  return (
    <form className="flex flex-col p-8 rounded-xl w-110 h-130 justify-between shadow-[0_10px_30px_rgba(0,0,0,0.15),0_4px_10px_rgba(0,0,0,0.2)] bg-gray-100">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-3xl font-bold">Create account</h1>
        <p className="font-light opacity-80">Join us today</p>
      </div>
      <div className="flex flex-col gap-2">
        <label>Full Name</label>
        <input
          className="border border-gray-300 focus:border-gray-400 focus:border-2 outline-none rounded-lg px-4 py-2"
          type="text"
          placeholder="John Doe"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Email</label>
        <input
          className="border border-gray-300 focus:border-gray-400 focus:border-2 outline-none rounded-lg px-4 py-2"
          type="text"
          placeholder="you@example.com"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-2">Password</label>
        <input
          className="border border-gray-300 focus:border-gray-400 focus:border-2 outline-none rounded-lg px-4 py-2"
          type="pasword"
          placeholder="********"
          required
        />
      </div>
      <button className="bg-gray-800 py-2 rounded-lg text-white active:scale-[0.95] cursor-pointer">
        Sign up
      </button>
      <p className="flex justify-center text-gray-500 gap-1">
        <span> Already have an account?</span>
        <span className="font-semibold cursor-pointer text-gray-800"
        onClick={()=>{
          setToggle(prev => !prev)
        }}>
          Sign in
        </span>
      </p>
    </form>
  );
};

export default Register;
