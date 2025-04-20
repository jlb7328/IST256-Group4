const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerInfo: {  
        fullName: String,
        email: String,
        phone: String,
        street_address: String,
        city: String,
        state: String,
        country: String,
        zip_code: String
    },
    orderInfo: [{
        ProductId: String,
        Quantity: Number
    }],
    paymentInfo: {
        cardName: String,
        cardNumber: Number,
        expirationDate: String,
        securityCode: Number
        
    },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
