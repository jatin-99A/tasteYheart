const Vendor = require("../models/vendor.model");
const { ErrorHandler } = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("../middlewares/errorHandler.middleware");
const userModel = require("../models/user.model");

// Register Vendor Controller
const registerVendor = catchAsyncErrors(async (req, res, next) => {
  const { userId, shopName, address, phone } = req.body;

  // Check if userId does not exist in user collection
  const user = await userModel.findById(userId);
  if (!user) {
    return next(
      new ErrorHandler(
        400,
        "User does not exist you must be a registered user to become a vendor"
      )
    );
  }

  // Check if a vendor already exists for the user
  const existingVendor = await Vendor.findOne({ userId });

  if (existingVendor) {
    return next(
      new ErrorHandler(400, "Vendor already registered with this user")
    );
  }

  const vendor = await Vendor.create({
    userId,
    shopName,
    address,
    phone,
  });

  res.status(201).json({
    message: "Vendor registered successfully",
    vendor,
  });
});

module.exports = { registerVendor };
