import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const UserForm = ({ setPostArr, updatePost, editPost, postArr }) => {
  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editPost !== null) {
      reset(postArr[editPost]);
    }
  }, [editPost]);

  let handleFormSubmit = (data) => {
    if (editPost !== null) {
      updatePost(data);
      alert("Post updated successfully.")
    } else {
      setPostArr((prev) => [...prev, data]);
    }

    reset();
  };

  return (
    <div className="h-[90%] flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col p-8 rounded-xl w-110 gap-2 justify-between shadow-[0_10px_30px_rgba(0,0,0,0.15),0_4px_10px_rgba(0,0,0,0.2)] bg-gray-500"
      >
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-3xl font-bold">
            {editPost !== null ? "UPDATE POST" : "CREATE POST"}
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <label>Image url</label>
          <input
            {...register("imgUrl", { required: "Image url is required!" })}
            className="border border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none rounded-lg px-4 py-2 bg-gray-400"
            type="text"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        {errors.imgUrl && (
          <p className="text-red-700">{errors.imgUrl.message}</p>
        )}
        <div className="flex flex-col gap-2">
          <label>Full Name</label>
          <input
            {...register("name", { required: "Name is required!" })}
            className="border border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none rounded-lg px-4 py-2 bg-gray-400"
            type="text"
            placeholder="John Doe"
          />
        </div>
        {errors.name && <p className="text-red-700">{errors.name.message}</p>}
        <div className="flex flex-col gap-2">
          <label>Title</label>
          <input
            {...register("title", { required: "Title url is required!" })}
            className="border border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none rounded-lg px-4 py-2 bg-gray-400"
            type="text"
            placeholder="Enter post title"
          />
        </div>
        {errors.title && <p className="text-red-700">{errors.title.message}</p>}
        <div className="flex flex-col gap-2">
          <label>Description</label>
          <textarea
            {...register("description", {
              required: "Description is required!",
            })}
            className="border border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none rounded-lg px-4 py-2 resize-none h-28 bg-gray-400"
            placeholder="Write your post content here..."
          ></textarea>
        </div>
        {errors.description && (
          <p className="text-red-700">{errors.description.message}</p>
        )}
        <button className="bg-gray-800 py-2 rounded-lg text-white active:scale-[0.95] cursor-pointer">
          {editPost !== null ? "UPDATE POST" : "ADD POST"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
