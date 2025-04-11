const express = require('express'); // import express
const router = express.Router(); // create router
const Return = require('../models/Returns'); // import Return model
// POST /api/returns — submit a return request
router.post('/', async (req, res) => {
  const returnData = new Return(req.body); // create return object
  const saved = await returnData.save(); // save to DB
  res.json(saved); // return saved return info
});
// GET /api/returns — view all return requests (optional)
router.get('/', async (req, res) => {
  const returns = await Return.find().populate('productId'); // get all returns with product details
  res.json(returns); // send as JSON
});
module.exports = router; // export router