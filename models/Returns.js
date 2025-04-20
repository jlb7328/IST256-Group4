const mongoose = require('mongoose');

const ReturnSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  refund: Boolean,
  returnReason: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Return', ReturnSchema);