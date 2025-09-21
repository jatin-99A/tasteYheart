const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    shopName: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    gstNumber: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },
    foodTypes: [{ type: String }],
    profileImage: { type: String },
    coverImages: [{ type: String }],
    rating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    totalOrders: { type: Number, default: 0 },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],


  },
  { timestamps: true }
);

module.exports = mongoose.model('Vendor', VendorSchema);
