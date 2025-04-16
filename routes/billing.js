const express = require('express')  // import Express.
const router = express.Router() // create a router.
const Billing = require('../models/Billing')  // import Billing model.
router.get('/', async (req, res) => { // GET all billing entries.
  try {
    const records = await Billing.find()  // get all billing documents.
    res.json(records) // return them.
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch billing records.' }) // return error if something fails.
  }
})
router.post('/', async (req, res) => {  // POST new billing data.
  try {
    const billingData = new Billing(req.body) // create a new billing record.
    await billingData.save()  // save to MongoDB.
    res.status(201).json(billingData) // return the saved billing record.
  } catch (err) {
    res.status(500).json({ error: 'Failed to save billing info.' }) // handle failure to save.
  }
})
module.exports = router // export the router.