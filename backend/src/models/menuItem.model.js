const mongoose = require('mongoose');

const addonOptionSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const addonSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['single', 'multiple'], default: 'single' },
  options: [addonOptionSchema]
});

const menuItemSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  images: [String],
  isVeg: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true },
  addons: [addonSchema],
  tags: [String],
  prepTime: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
