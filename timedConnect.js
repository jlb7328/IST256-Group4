const mongoose = require('mongoose');

const TimeSchema = new mongoose.Schema({
    ConnectEstablished: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TimedConnect', TimeSchema);
