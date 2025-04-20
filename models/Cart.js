const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userID: String,
    items: [
        {
            ProductId: String,
            Quantity: Number
        }
    ],
    savedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema);
