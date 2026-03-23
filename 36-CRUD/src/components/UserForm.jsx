import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";

const UserForm = ({ setUsers, setToggle, editUsers, setEditUsers, users }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange", defaultValues: editUsers });

  let handleFormSubmit = (data) => {
    if (editUsers) {
      setUsers((prev) => {
        let updatedUser = prev.map((val) => {
          return val.id === editUsers.id ? { ...val, ...data } : val;
        });
        localStorage.setItem("users", JSON.stringify(updatedUser));
        return updatedUser;
      });
      setEditUsers(null);
    } else {
      let userArr = [...users, { ...data, id: nanoid() }];
      setUsers(userArr);
      localStorage.setItem("users", JSON.stringify(userArr));
    }

    reset();
    setToggle(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gray-700 ">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col p-6 sm:p-8 rounded-xl w-full max-w-md gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.15),0_4px_10px_rgba(0,0,0,0.2)] bg-gray-500"
      >
        {/* Heading */}
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            CREATE USER
          </h1>
        </div>

        {/* Image URL */}
        <div className="flex flex-col gap-1">
          <label className="text-sm sm:text-base">Image url</label>
          <input
            {...register("imgUrl", { required: "Image Url is required!" })}
            className="border border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none rounded-lg px-3 py-2 bg-gray-400 text-sm sm:text-base"
            type="text"
            placeholder="e.g.  https://example.com/image.jpg"
          />
        </div>
        {errors.imgUrl && (
          <p className="text-red-700">{errors.imgUrl.message}</p>
        )}

        {/* Name */}

        <div className="flex flex-col gap-1">
          <label className="text-sm sm:text-base">Full Name</label>
          <input
            {...register("name", { required: "Name is required!" })}
            className="border border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none rounded-lg px-3 py-2 bg-gray-400 text-sm sm:text-base"
            type="text"
            placeholder="e.g.  John Doe"
          />
        </div>
        {errors.name && <p className="text-red-700">{errors.name.message}</p>}

        {/* Designation */}
        <div className="flex flex-col gap-1">
          <label className="text-sm sm:text-base">Designation</label>
          <input
            {...register("designation", {
              required: "Designation is required!",
            })}
            className="border border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none rounded-lg px-3 py-2 bg-gray-400 text-sm sm:text-base"
            type="text"
            placeholder="e.g. Software Developer"
          />
        </div>
        {errors.designation && (
          <p className="text-red-700">{errors.designation.message}</p>
        )}

        {/* Mobile numbeer */}
        <div className="flex flex-col gap-1">
          <label className="text-sm sm:text-base">Mobile number</label>
          <input
            {...register("mobileNumber", {
              required: "Mobile number is required!",
              minLength: {
                value: 10,
                message: "Min 10 digitis are required!",
              },
              maxLength: {
                value: 10,
                message: "Max 10 digitis are required!",
              },
            })}
            className="border border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none rounded-lg px-3 py-2 bg-gray-400 text-sm sm:text-base"
            type="number"
            placeholder="e.g. +91 9876543210"
          ></input>
        </div>
        {errors.mobileNumber && (
          <p className="text-red-700">{errors.mobileNumber.message}</p>
        )}

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm sm:text-base">Email</label>
          <input
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "Invalid email format!",
              },
            })}
            className="border border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none rounded-lg px-3 py-2 bg-gray-400 text-sm sm:text-base"
            type="email"
            placeholder="e.g.  you@example.com"
          ></input>
        </div>
        {errors.email && <p className="text-red-700">{errors.email.message}</p>}

        {/*Employee ID */}
        <div className="flex flex-col gap-1">
          <label className="text-sm sm:text-base">Employee Id</label>
          <input
            {...register("empId", {
              required: "Employee Id is required!",
            })}
            className="border border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none rounded-lg px-3 py-2 bg-gray-400 text-sm sm:text-base"
            type="text"
            placeholder="e.g. emp123"
          />
        </div>
        {errors.empId && <p className="text-red-700">{errors.empId.message}</p>}
        {/*Role */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Role</label>
          <div className="flex gap-4 items-center">
            <input
              {...register("role", { required: "Role is required!" })}
              className="cursor-pointer"
              type="radio"
              name="role"
              value="manager"
            />{" "}
            Manager
            <input
              {...register("role", { required: "Role is required!" })}
              className="cursor-pointer"
              type="radio"
              name="role"
              value="employee"
            />{" "}
            Employee
          </div>
        </div>
        {errors.role && <p className="text-red-700">{errors.role.message}</p>}

        {/* Button */}
        <button
          disabled={!isValid}
          className={` ${isValid ? "bg-gray-800 active:scale-[0.95] cursor-pointer" : "bg-gray-400 cursor-not-allowed"} py-2 rounded-lg text-white  transition text-sm sm:text-base`}
        >
          ADD USER
        </button>
      </form>
    </div>
  );
};

export default UserForm;
