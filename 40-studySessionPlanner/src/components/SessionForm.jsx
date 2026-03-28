import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { MyContext } from "../context/SessionContext";

const SessionForm = () => {
  const { addSession } = useContext(MyContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  const handleFormSubmit = (data) => {
    addSession(data);
    reset();
  };

  return (
    <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-full max-w-md sm:max-w-lg bg-gray-700 gap-4 p-5 sm:p-6 rounded-xl border flex flex-col"
      >
        <h1></h1>
        {/* Topic Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm sm:text-base">Topic Name</label>
          <input
            {...register("topicName", {
              required: "Topic Name is required!",
              minLength: {
                value: 3,
                message: "Minimum 3 characters required!",
              },
              maxLength: {
                value: 20,
                message: "Maximum 20 characters allowed!",
              },
            })}
            className="border border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none rounded-lg px-3 py-2 bg-gray-500 text-gray-800 text-sm sm:text-base"
            type="text"
            placeholder="Topic Name"
          />
          {errors.topicName && (
            <p className="text-red-500 text-sm">{errors.topicName.message}</p>
          )}
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-2">
          <label className="text-sm sm:text-base">Subject</label>
          <select
            {...register("subject", { required: "Subject is required!" })}
            className="border border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none rounded-lg px-3 py-2 bg-gray-500 text-gray-800 text-sm sm:text-base"
          >
            <option value="">Select Subject</option>
            <option value="DSA">DSA</option>
            <option value="WEB-DEV">Web Dev</option>
            <option value="DBMS">DBMS</option>
            <option value="OS">OS</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject.message}</p>
          )}
        </div>

        {/* Duration */}
        <div className="flex flex-col gap-2">
          <label className="text-sm sm:text-base">Duration (minutes)</label>
          <input
            {...register("studyDuration", {
              required: "Study Duration is required!",
              minLength: {
                value: 2,
                message: "Minimum 10 minutes required!",
              },
              maxLength: {
                value: 3,
                message: "Maximum 999 minutes required!",
              },
            })}
            className="border border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none rounded-lg px-3 py-2 bg-gray-500 text-gray-800 text-sm sm:text-base"
            type="number"
            placeholder="Study Duration"
          />
          {errors.studyDuration && (
            <p className="text-red-500 text-sm">
              {errors.studyDuration.message}
            </p>
          )}
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-2">
          <label className="text-sm sm:text-base">Priority</label>
          <select
            {...register("priority", {
              required: "Priority is required!",
            })}
            className="border border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none rounded-lg px-3 py-2 bg-gray-500 text-gray-800 text-sm sm:text-base"
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          {errors.priority && (
            <p className="text-red-500 text-sm">{errors.priority.message}</p>
          )}
        </div>

        {/* Date */}
        <div className="flex flex-col gap-2">
          <label className="text-sm sm:text-base">Date</label>
          <input
            {...register("date", {
              required: "Date is required!",
            })}
            className="border border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none rounded-lg px-3 py-2 bg-gray-500 text-gray-800 text-sm sm:text-base"
            type="date"
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>

        {/* Button */}
        <button
          disabled={!isValid}
          className={`w-full py-2 rounded-lg text-white transition text-sm sm:text-base ${
            isValid
              ? "bg-gray-900 active:scale-95 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Add Session
        </button>
      </form>
    </div>
  );
};

export default SessionForm;
