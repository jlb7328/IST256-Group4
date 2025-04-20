const express = require('express');
const router = express.Router();
//const Return = require('../models/Returns');

// API route to save return data
router.post('/api/returns', async (req, res) => {
    try {
        const newReturn = new Return(req.body);
        const savedReturn = await newReturn.save();
        res.status(201).json(savedReturn);
    } catch (error) {
        console.error('Error saving return:', error);
        res.status(500).json({ error: 'Failed to save return' });
    }
});

module.exports = router;