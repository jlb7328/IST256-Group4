const express = require('express'); // import express for routing
const router = express.Router(); // create a router object
const Product = require('../models/Product'); // import the Product model
// GET /api/products — returns all products in the database
router.get('/', async (req, res) => {
  const products = await Product.find(); // find all products
  res.json(products); // send products as JSON
});
// POST /api/products — adds a new product to the database
router.post('/', async (req, res) => {
  const newProduct = new Product(req.body); // create a new Product from request body
  const saved = await newProduct.save(); // save the product to the database
  res.json(saved); // send back the saved product
});
module.exports = router; // export the router to be used in server.js
