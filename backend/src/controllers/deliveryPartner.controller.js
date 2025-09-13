const DeliveryPartner = require("../models/deliveryPartner.model");
const { ErrorHandler } = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("../middlewares/errorHandler.middleware");
const userModel = require("../models/user.model");


// Register Delivery Partner Controller
const registerDeliveryPartner = catchAsyncErrors(async (req, res, next) => {
  const { userId, name, phone, licenseNumber, aadhaarOrId } = req.body;

  // Check if userId does not exist in user collection
  const user = await userModel.findById(userId);
  if(!user) {
    return next(new ErrorHandler(400, "User does not exist you must be a registered user to become a delivery partner"))
  }

  // Check if already registered with same userId
  const existing = await DeliveryPartner.findOne({ userId });

  if (existing) {
    return next(new ErrorHandler(400, "Delivery partner already registered with this user"));
  }

  const partner = await DeliveryPartner.create({
    userId,
    name,
    phone,
    licenseNumber,
    aadhaarOrId,
  });

  res.status(201).json({
    message: "Delivery partner registered successfully",
    deliveryPartner: partner,
  });
});

module.exports = { registerDeliveryPartner };
