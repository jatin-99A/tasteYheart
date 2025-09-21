const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['percentage', 'fixed'], required: true },
  value: { type: Number, required: true },
  minOrderValue: Number,
  expiry: Date,
  usageLimit: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Promo', promoSchema);
