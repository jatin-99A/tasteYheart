const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  name: String,
  qty: Number,
  price: Number,
  addons: [String]
});

const paymentSchema = new mongoose.Schema({
  method: String,
  status: String,
  transactionId: String
});

const deliveryInfoSchema = new mongoose.Schema({
  partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPartner' },
  etaMinutes: Number,
  currentLocation: {
    lat: Number,
    lng: Number
  }
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [orderItemSchema],
  subtotal: Number,
  tax: Number,
  deliveryFee: Number,
  discounts: Number,
  total: Number,
  payment: paymentSchema,
  status: { type: String, enum: ['placed','accepted','preparing','ready','out_for_delivery','delivered','cancelled','refunded'], default: 'placed' },
  deliveryInfo: deliveryInfoSchema,
  notes: String,
  addressSnapshot: Object,
  statusTimestamps: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
