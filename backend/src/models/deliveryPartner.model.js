const mongoose = require('mongoose');

const DeliveryPartnerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    aadhaarOrId: { type: String, required: true},
    profileImage: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    currentLocation: { type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: { type: [Number], default: [0, 0] } },
    assignedOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    rating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },

  },
  { timestamps: true }
);

module.exports = mongoose.model('DeliveryPartner', DeliveryPartnerSchema);
