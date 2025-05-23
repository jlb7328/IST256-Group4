const http = require('http')  // require http.
const fs = require('fs')  // require fs.
const express = require('express')  // require the express library to be downloaded.
const path = require('path')  // require path.
const mongoose = require('mongoose')  // require Mongoose for MongoDB. 
const app = express() // creates an app variable by calling the express function.
const port = 8000 // defines the port as 8000.
require('dotenv').config(); // load environment variables from .env.
/*
mongoose.connect(toString(process.env.MONGO_URI), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})  // connect to MongoDB using Mongoose.
.then(() => console.log("MongoDB connected successfully.")) // display message if MongoDB connection is successful.
.catch((err) => console.error("MongoDB connection error:", err))  // catch error and display message if MongoDB connection is unsuccessful.
*/

app.use(express.static(path.join(__dirname, 'public')));  // middleware to serve static files from /public
app.use(express.json());  // middleware to parse incoming JSON data.
app.set('view engine', 'ejs') // set the view engine to ejs.
app.get('/', (req, res) => {
  console.log("At Group 4 Website")
  res.render("index") // render index file.
})
//const billingRouter = require("./routes/billing") // import billing router into server.
//const cartRouter = require("./routes/cart") // import cart router into server.
//const productsRouter = require("./routes/products") // import products router into server.
//const returnsRouter = require("./routes/returns") // import returns router into server.
//const shippingRouter = require("./routes/shipping") // import shipping router into server.

const { connectToDatabase } = require('./connect');
//app.use('/billing', billingRouter)  // use billing router in server.
//app.use('/cart', cartRouter)  // use cart router in server.
//app.use('/products', productsRouter)  // use products router in server.
//app.use('/returns', returnsRouter)  // use returns router in server.
//app.use('/shipping', shippingRouter)  // use shipping router in server.

app.listen(port)  // make the app actually run.

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


//DatabaseConnect

const dbPort=27017;
mongoose.connect("mongodb+srv://TestAdmin:HgwMzuwkJfaHIbMT@gate-logistics.3fvmnet.mongodb.net/IST256?retryWrites=true&w=majority&appName=GATE-Logistics").then(() => {
    console.log("MongoDB connected successfully.")})
    
//Proves connection proof by adding info into test/timedconnections

const DateCon = require('./timedConnect')
const connectDate = new DateCon({ ConnectionEstablished: new Date() })
connectDate.save().then(() => console.log("Timestamp Uploaded"))

const paydata = require('./models/Billing');
const shipdata = require('./models/Shipping');
const ordersData = require('./models/Orders');
const Account = require('./models/Accounts');
const Cart = require('./models/Cart'); // Import the Cart model
const Return = require('./models/Returns'); // Import the Returns model

async function messyClean() {
  try {
    const lastEntry = await shipdata.findOne().sort({ _id: -1 });
    if (lastEntry) {
      await shipdata.deleteOne({ _id: lastEntry._id });
      console.log("Double Shipment deleted successfully!");
    } else {
      console.log("No payment entries found to delete.");
    }
  } catch (error) {
    console.error('Error deleting last shipment double:', error.message);
  }
}

app.use(express.json()); // Middleware to parse JSON data


app.post('/checkout', async (req, res) => {
  try {
      console.log("Received shipping data"); // Corrected log message
      const shippingData = req.body; // Renamed variable for clarity
      const shippingDetails = new shipdata(shippingData); // Correctly using shipdata model
      await shippingDetails.save();
      res.status(201).send({ message: 'Shipping data saved successfully!' });
      console.log("Shipping data saved successfully!"); // Corrected log message
  } catch (error) {
      console.error('Error saving shipping data:', error);
      res.status(500).send({ error: 'Failed to save shipping data' });
  }
});

app.post('/payment', async (req, res) => {
    try {
        console.log("Received payment data");
        const paymentData = req.body;
        const billingDetails = new paydata(paymentData); 
        await billingDetails.save();
        res.status(201).send({ message: 'Payment data saved successfully!' });
        console.log("Payment data saved successfully!");
        messyClean();
    } catch (error) {
        console.error('Error saving payment data:', error);
        res.status(500).send({ error: 'Failed to save payment data' });
    }
});

app.post('/orders', async (req, res) => {
    try {
        console.log("Received order data:", req.body);

        const orderData = req.body;

        // Validate the incoming orderData structure
        if (!orderData.customerInfo || !orderData.orderInfo || !orderData.paymentInfo) {
            console.error("Invalid order data structure:", orderData);
            return res.status(400).send({ error: 'Invalid order data structure' });
        }

        console.log("Received paymentInfo:", orderData.paymentInfo);

        const orderDetails = new ordersData(orderData);
        await orderDetails.save();
        res.status(201).send({ message: 'Order data saved successfully!' });
        console.log("Order data saved successfully!");
    } catch (error) {
        console.error('Error saving order data:', error);
        res.status(500).send({ error: 'Failed to save order data' });
    }
});

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password, age, phone, address } = req.body;

    // Validate required fields
    if (!name || !email || !password || !age || !phone || !address) {
      return res.status(400).send({ error: 'All fields are required.' });
    }

    // Create a new account document
    const newAccount = new Account({ name, email, password, age, phone, address });
    await newAccount.save();

    res.status(201).send({ message: 'Account created successfully!' });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).send({ error: 'Failed to create account.' });
  }
});

app.get('/delete-last-entry', async (req, res) => {
  
  try {
    const lastEntry = await paydata.findOne().sort({ _id: -1 });
    if (lastEntry) {
      await paydata.deleteOne({ _id: lastEntry._id });
      console.log("Last payment deleted successfully!");
      res.status(200).send({ message: 'Last entry deleted successfully!' });
    } else {
      res.status(404).send({ message: 'No entries found to delete.' });
    }
  } catch (error) {
    console.error('Error deleting last entry:', error.message);
    res.status(500).send({ error: 'Failed to delete last entry', details: error.message });
  }
  try {
    const lastEntry = await shipdata.findOne().sort({ _id: -1 });
    if (lastEntry) {
      await shipdata.deleteOne({ _id: lastEntry._id });
      console.log("Last ship deleted successfully!");
      res.status(200).send({ message: 'Last entry deleted successfully!' });
    } else {
      res.status(404).send({ message: 'No entries found to delete.' });
    }
  } catch (error) {
    console.error('Error deleting last entry:', error.message, '\n \n FALSE POSITIVE \n \n No Actual Errors. Carry On.\n \n');
    res.status(500).send({ error: 'Failed to delete last entry', details: error.message });
  }
});

app.get('/get-latest-account', async (req, res) => {
  console.log("Fetching latest account ID...");
  try {
    const latestAccount = await Account.findOne().sort({ _id: -1 }); // Get the most recent account
    if (latestAccount) {
      res.status(200).send({ _id: latestAccount._id });
      console.log('Latest account ID:', latestAccount._id); // Log the ID of the latest account
    } else {
      res.status(404).send({ error: 'No accounts found.' });
    }
  } catch (error) {
    console.error('Error fetching latest account:', error);
    res.status(500).send({ error: 'Failed to fetch latest account.' });
  }
});

app.get('/get-cart', async (req, res) => {
    const { accountId } = req.query;
    if (!accountId) {
        return res.status(400).send({ error: 'Account ID is required.' });
    }

    try {
        const cart = await Cart.where("userID").equals(accountId);
        if (cart) {
            res.status(200).send(cart);
        } else {
            res.status(404).send({ error: 'No cart found for this account ID.' });
        }
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).send({ error: 'Failed to fetch cart.' });
    }
});

app.post('/save-cart', async (req, res) => {
    const { accId, items } = req.body;

    if (!accId || !items) {
        return res.status(400).send({ error: 'Account ID and cart items are required.' });
    }

    try {
        const existingCart = await Cart.findOne({ userID: accId });
        if (existingCart) {
            // Update the existing cart
            existingCart.items = items;
            existingCart.savedAt = new Date();
            await existingCart.save();
            console.log("Cart updated successfully!");
            res.status(200).send({ message: 'Cart updated successfully.' });
        } else {
            // Create a new cart
            const newCart = new Cart({ userID: accId, items });
            await newCart.save();
            console.log("Cart created successfully!");
            res.status(201).send({ message: 'Cart saved successfully.' });
        }
    } catch (error) {
        console.error('Error saving cart:', error);
        res.status(500).send({ error: 'Failed to save cart.' });
    }
});

app.post('/api/returns', async (req, res) => {
    try {
        console.log("Received return data:", req.body);
        const returnData = new Return(req.body); // Create a new document using the Returns model
        await returnData.save(); // Save the document to the "returns" collection
        res.status(201).send({ message: 'Return data saved successfully!' });
        console.log("Return data saved successfully!");
    } catch (error) {
        console.error('Error saving return data:', error);
        res.status(500).send({ error: 'Failed to save return data' });
    }
});

app.delete('/delete-cart', async (req, res) => {
    const { accountId } = req.query;

    if (!accountId) {
        return res.status(400).send({ error: 'Account ID is required.' });
    }

    try {
        const deletedCart = await Cart.findOneAndDelete({ userID: accountId });
        if (deletedCart) {
            console.log("Cart entry deleted successfully for accountId:", accountId);
            res.status(200).send({ message: 'Cart entry deleted successfully.' });
        } else {
            console.log("No matching cart entry found for accountId:", accountId);
            res.status(404).send({ message: 'No matching cart entry found.' });
        }
    } catch (error) {
        console.error('Error deleting cart entry:', error);
        res.status(500).send({ error: 'Failed to delete cart entry.' });
    }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);  // notify user of server running.
});
