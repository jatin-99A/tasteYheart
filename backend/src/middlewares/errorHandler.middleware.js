const errorHandler = (err, req, res, next) => {
  let message = err.message || "Internal Sever Error";
  let statusCode = err.statusCode || 500;

  const errorMap = {
    ValidationError: { statusCode: 400 },
    CastError: { statusCode: 400, message: "Invalid ID format" },
    SyntaxError: { statusCode: 400, message: "Malformed JSON in request body" },
    JsonWebTokenError: { statusCode: 401 },
    TokenExpiredError: { statusCode: 401 },
  };

  if (err.cause && err.cause.code === 11000) {
    statusCode = 409;
    message = "Please use a unique value";
  } else if (errorMap[err.name]) {
    statusCode = errorMap[err.name].statusCode;
    message = errorMap[err.name].message || message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

// Async Errors Handler
const catchAsyncErrors = (fun) => (req, res, next) => {
  Promise.resolve(fun(req, res, next)).catch(next);
};

module.exports = {
  errorHandler,
  catchAsyncErrors,
};
