const { default: User } = require("../models/user.model");
const ApiError = require("../utils/apiError");

const makeUserResponse = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };
};

const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email and password are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = user.generateToken();

  return res.status(201).json({
    token,
    user: makeUserResponse(user),
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  user.status = "online";
  user.lastSeen = new Date();
  await user.save();

  const token = user.generateToken();

  return res.status(200).json({
    token,
    user: makeUserResponse(user),
  });
};

module.exports = {
  registerController,
  loginController,
};