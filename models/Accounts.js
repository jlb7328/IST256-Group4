const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
accId: String,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
createdAt: { type: Date, default: Date.now }})

module.exports = mongoose.model('Account', accountSchema);
