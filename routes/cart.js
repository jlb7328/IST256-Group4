const express = require('express')  // import Express.
const router = express.Router() // create a router.
const Cart = require('../models/Cart')  // import the CartItem model.

router.get('/', async (req, res) => { // GET all items in the shopping cart
  try {
    const items = await Cart.find() // retrieve all cart items
    res.json(items) // Send them as JSON
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart items.' })  // send error if query fails.
  }
})
router.post('/', async (req, res) => {  // POST a new item into the shopping cart.
  try {
    const newItem = new Cart(req.body)  // create a new cart item from the request body.
    await newItem.save()  // save to the database.
    res.status(201).json(newItem) // respond with the newly created item.
  } catch (err) {
    res.status(500).json({ error: 'Failed to add cart item.' }) // handle any save errors.
  }
})
module.exports = router;  // export this router.