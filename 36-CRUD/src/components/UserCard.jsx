import React from "react";

const UserCard = ({ user, handleDelete }) => {
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-xs flex flex-col p-5 bg-gray-600 gap-4 rounded-2xl shadow-lg hover:shadow-xl transition">
      {/* Image */}
      <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-gray-400">
        <img
          className="w-full h-full object-cover"
          src={user.imgUrl}
          alt="User"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-xl font-semibold text-green-300">{user.name}</h1>

        <p className="text-sm text-red-300">{user.designation}</p>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 text-sm text-gray-300">
        <p>
          <span className="text-gray-100 font-medium"> Mobile:</span>{" "}
          {user.mobileNumber}
        </p>
        <p>
          <span className="text-gray-100 font-medium"> Email:</span>{" "}
          {user.email}
        </p>
        <p>
          <span className="text-gray-100 font-medium"> Emp Id:</span>{" "}
          {user.empId}
        </p>
        <p>
          <span className="text-gray-100 font-medium"> Role:</span> {user.role}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mt-3">
        <button className="w-full cursor-pointer border-2 border-blue-600 text-white py-2 rounded-xl active:scale-[0.95] hover:text-blue-500 hover:bg-gray-300 transition">
          Update
        </button>
        <button
          onClick={() => handleDelete(user.empId)}
          className="w-full cursor-pointer border-2 border-red-600 text-white py-2 rounded-xl active:scale-[0.95] hover:text-red-600 hover:bg-gray-300 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default UserCard;
