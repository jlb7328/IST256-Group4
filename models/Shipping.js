const mongoose = require('mongoose');

const ShippingSchema = new mongoose.Schema({
  fullName: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  country: String,
  phone: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shipping', ShippingSchema);
