const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { catchAsyncErrors } = require("./errorHandler.middleware");
const { ErrorHandler } = require("../utils/ErrorHandler");

// Middleware to check if the user is authenticated or not
const authUserMiddleware = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new ErrorHandler(401, "Please Login First"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findById(decoded.id);

  req.user = user;

  next();
});

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleware,
};
