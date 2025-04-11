const express = require('express'); // import express
const router = express.Router(); // create router
const Billing = require('../models/Billing'); // import Billing model
// POST /api/billing — save new billing information
router.post('/', async (req, res) => {
  const billingData = new Billing(req.body); // create billing object
  const saved = await billingData.save(); // save to DB
  res.json(saved); // return saved billing info
});
module.exports = router; // export router