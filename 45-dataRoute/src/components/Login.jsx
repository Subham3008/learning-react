import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  let { setLoggedUser, regUser } = useContext(Auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onchange",
  });

  let navigate = useNavigate();

  let handleFormSubmit = (data) => {
    let user = regUser.find(
      (user) => user.email === data.email && user.password === data.password,
    );

    if (!user) {
      toast.error("User not found");
      reset();
      return;
    }
    setLoggedUser(user);
    navigate("/dashboard");
    localStorage.setItem("logged user", JSON.stringify(user));
    toast.success("User logged in successfully.");
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Logged In
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              {...register("email", { required: "Email is required!" })}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters is required!",
                },
                maxLength: {
                  value: 12,
                  message: "Maximum 12 characters is required!",
                },
              })}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Button */}
          <button
            disabled={!isValid}
            type="submit"
            className={`w-full text-white py-2 rounded-lg transition
    ${
      !isValid
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }
  `}
          >
            Log In
          </button>
        </form>

        {/* Bottom Text */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
