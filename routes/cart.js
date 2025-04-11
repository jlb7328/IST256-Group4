const express = require('express'); // import express
const router = express.Router(); // create a router
const Cart = require('../models/Cart'); // import the Cart model
// GET /api/cart — returns all cart documents with populated product details
router.get('/', async (req, res) => {
  const cart = await Cart.find().populate('items.productId'); // get carts with product info filled in
  res.json(cart); // send as JSON
});
// POST /api/cart — adds a new cart document
router.post('/', async (req, res) => {
  const newCart = new Cart(req.body); // create a new Cart with the submitted data
  const saved = await newCart.save(); // save to the database
  res.json(saved); // return the saved cart
});
module.exports = router; // export the router