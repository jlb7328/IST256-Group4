const mongoose = require('mongoose');

const ShippingSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  street_address: String,
  city: String,
  state: String,
  country: String,
  zip_code: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shipping', ShippingSchema);
