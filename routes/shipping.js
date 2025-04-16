const express = require('express')  // import Express.
const router = express.Router() // create a router.
const Shipping = require('../models/Shipping')  // import the Shipping model.


router.get('/', async (req, res) => { // GET all shipping entries.
  try {
    const records = await Shipping.find() // find all shipping documents.
    res.json(records) // respond with them.
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch shipping records.' })  // handle error.
  }
})
router.post('/', async (req, res) => {  // POST a new shipping record.
  try {
    const shippingData = new Shipping(req.body) // create a new Shipping entry.
    await shippingData.save() // save to MongoDB.
    res.status(201).json(shippingData)  // return the new record.
  } catch (err) {
    res.status(500).json({ error: 'Failed to save shipping info.' })  // handle save error.
  }
})
module.exports = router // export this router.
