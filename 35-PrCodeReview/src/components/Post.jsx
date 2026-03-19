import React from "react";

const Post = ({ post, handleDelete, handleEdit }) => {
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-xs flex flex-col p-4 bg-gray-500 border gap-3 rounded-2xl shadow-md">
      {/* Image */}
      <div className="w-full aspect-square rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={post.imgUrl}
          alt="Post-Image"
        />
      </div>

      {/* Content */}
      <h1 className="text-lg font-semibold text-white">
        Name: <span>{post.name}</span>
      </h1>
      <p className="text-sm text-gray-200">
        Title: <span>{post.title}</span>
      </p>
      <p className="text-sm text-gray-300 line-clamp-3">
        Description: <span>{post.description}</span>
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:justify-between mt-2">
        <button
        onClick={handleEdit}
         className="w-full sm:w-auto cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-xl active:scale-[0.95] hover:bg-blue-500 transition">
          Update
        </button>
        <button
          onClick={handleDelete}
          className="w-full sm:w-auto cursor-pointer bg-red-600 text-white px-4 py-2 rounded-xl active:scale-[0.95] hover:bg-red-500 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Post;
