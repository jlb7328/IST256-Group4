const express = require('express'); // import express
const router = express.Router(); // create router
const Shipping = require('../models/Shipping'); // import Shipping model
// POST /api/shipping — save a new shipping form entry
router.post('/', async (req, res) => {
  const shippingData = new Shipping(req.body); // create new Shipping object
  const saved = await shippingData.save(); // save to DB
  res.json(saved); // return the saved shipping data
});
// GET /api/shipping — get all shipping records (optional, useful for admin/testing)
router.get('/', async (req, res) => {
  const shipping = await Shipping.find(); // get all entries
  res.json(shipping); // return entries
});
module.exports = router; // export router