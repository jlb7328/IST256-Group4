const mongoose = require('mongoose');

const ReturnSchema = new mongoose.Schema({
  orderId: String,
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  reason: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Return', ReturnSchema);