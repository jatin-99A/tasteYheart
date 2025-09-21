const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { catchAsyncErrors } = require('./errorHandler.middleware');
const { ErrorHandler } = require('../utils/ErrorHandler');

// Middleware to protect routes and check user roles
const authMiddleware = (role) =>
  catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return next(new ErrorHandler(401, 'Please login first'));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select('-password');
    if (!user) return next(new ErrorHandler(401, 'User not found'));

    if (role && user.role !== role) {
      return next(new ErrorHandler(403, 'You are not authorized to access this resource'));
    }

    req.user = user;
    next();
  });

module.exports = {
  authMiddleware,
};
