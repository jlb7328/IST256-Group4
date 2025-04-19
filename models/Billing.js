const mongoose = require('mongoose');

const BillingSchema = new mongoose.Schema({
  card_number: Number,
  expiration_date: String,
  security_code: Number,
  card_name: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Billing', BillingSchema);
