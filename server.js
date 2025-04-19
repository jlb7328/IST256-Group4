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
const billingRouter = require("./routes/billing") // import billing router into server.
const cartRouter = require("./routes/cart") // import cart router into server.
const productsRouter = require("./routes/products") // import products router into server.
const returnsRouter = require("./routes/returns") // import returns router into server.
const shippingRouter = require("./routes/shipping") // import shipping router into server.
//const mongoosescript = require('./mongoosescript'); // Import the mongoosescript module
//const localgoose = require('./localgoose'); // Import the localgoose module
const { connectToDatabase } = require('./connect');
app.use('/billing', billingRouter)  // use billing router in server.
app.use('/cart', cartRouter)  // use cart router in server.
app.use('/products', productsRouter)  // use products router in server.
app.use('/returns', returnsRouter)  // use returns router in server.
app.use('/shipping', shippingRouter)  // use shipping router in server.
app.listen(port)  // make the app actually run.

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


//DatabaseConnect

//Use whichever finally works {cloud based, local, generated} Comment out other

//mongoosescript();
//localgoose();




app.use(express.json()); // Middleware to parse JSON data

app.post('/checkout', async (req, res) => {
    try {
        const newOrder = req.body; // Get JSON data from the request body

        // Read the existing orders from orders.json
        const ordersFilePath = './orders.json';
        let orders = [];

        if (fs.existsSync(ordersFilePath)) {
            const ordersData = fs.readFileSync(ordersFilePath, 'utf-8');
            orders = JSON.parse(ordersData);
        }

        // Add the new order to the orders array
        orders.push(newOrder);

        // Write the updated orders back to orders.json
        fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), 'utf-8');

        res.status(201).send({ message: 'Order saved successfully!' });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).send({ error: 'Failed to save order' });
    }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);  // notify user of server running.
});














//server testing without express. Works fine but we are now using express. Keeping as backup incase express does not work for others.
/*
const server = http.createServer(function(req, res) {
res.writeHead(200, { 'Content-Type': 'text/html' })
fs.readFile('index.html', function(error, data) {
  if (error) {
    res.writeHead(404)
    res.write('Error: File Not Found')
  } else {
    res.write(data)
  }
  
  res.end()
})

})

server.listen(port, function(error) {
  if (error) {
    console.log('Something went wrong', error)
  } else {
    console.log('Server is listening on port ' + port)
  }
})
  */