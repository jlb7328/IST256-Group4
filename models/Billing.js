const mongoose = require('mongoose');

const BillingSchema = new mongoose.Schema({
  fullName: String,
  cardNumber: String,
  expirationDate: String,
  cvv: String,
  billingAddress: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Billing', BillingSchema);
