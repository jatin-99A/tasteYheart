const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { catchAsyncErrors } = require("../middlewares/errorHandler.middleware");
const { ErrorHandler } = require("../utils/ErrorHandler");

// Register User Controller
const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, phone, addresses } = req.body;

  // Validate addresses 
  if (!Array.isArray(addresses) || addresses.length === 0) {
    return next(new ErrorHandler(400, "At least one address is required"));
  }

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return next(new ErrorHandler(400, "User already exists"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    addresses,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      addresses: user.addresses,
    },
  });
});

// Login User Controller
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return next(new ErrorHandler(400, "Invalid email or password"));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return next(new ErrorHandler(400, "Invalid email or password"));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      addresses: user.addresses,
    },
  });
});

// Logout User Controller
const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
