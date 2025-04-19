const mongoose = require('mongoose');

const TimeSchema = new mongoose.Schema({
    ConnectionEstablished: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TimeStamp', TimeSchema);
