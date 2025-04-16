const express = require('express')  // import Express.
const router = express.Router() // create a router.
const Return = require('../models/Return')  // import Return model.
router.get('/', async (req, res) => { // GET all return records.
  try {
    const records = await Return.find() // get all return entries from database.
    res.json(records) // respond with the results.
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch return records.' })  // handle error.
  }
})
router.post('/', async (req, res) => {  // POST new return data.
  try {
    const returnData = new Return(req.body) // create a new return entry.
    await returnData.save() // save it to MongoDB.
    res.status(201).json(returnData)  // respond with saved data.
  } catch (err) {
    res.status(500).json({ error: 'Failed to process return.' })  // handle failure
  }
})
module.exports = router; // export the router.