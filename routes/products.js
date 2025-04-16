const express = require('express')  // import Express to create the router.
const router = express.Router() // create a new router instance.
const Product = require('../models/Product')  // import the Product model (from models/Product.js).
router.get('/', async (req, res) => { // GET all products from the database.
  try {
    const products = await Product.find() // fetch all products.
    res.json(products)  // send the products as a JSON response.
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products.' })  // if there's an error, send a 500 status with error message.
  }
})
router.post('/', async (req, res) => {  // POST a new product to the database.
  try {
    const newProduct = new Product(req.body)  // create a new product using data from the request body.
    await newProduct.save() // save it to MongoDB.
    res.status(201).json(newProduct)  // send back the created product.
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product.' }) // handle errors during save.
  }
})
module.exports = router // export the router so it can be used in server.js.