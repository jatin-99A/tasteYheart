const mongoose = require('mongoose');

const openingHoursSchema = new mongoose.Schema({
  day: { type: String, required: true },
  open: { type: String, required: true },
  close: { type: String, required: true }
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: String,
  categories: [String],
  address: {
    street: String,
    city: String,
    pincode: String,
    lat: Number,
    lng: Number,
    landmark: String
  },
  openingHours: [openingHoursSchema],
  avgPreparationTime: Number,
  rating: { type: Number, default: 0 },
  isOpen: { type: Boolean, default: true },
  images: [String],
  menuSections: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

restaurantSchema.index({ 'address.lat': 1, 'address.lng': 1 });

module.exports = mongoose.model('Restaurant', restaurantSchema);
