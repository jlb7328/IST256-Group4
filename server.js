const http = require('http')
const fs = require('fs')
const express = require('express')  // require the express library to be downloaded.
const app = express() // creates an app variable by calling the express function.
const port = 8000 // defines the port as 8000.

app.set('view engine', 'ejs') // set the view engine to ejs.
app.get('/', (req, res) => {  // updated GET for testing purposes.
  console.log("At Group 4 Website")
  res.send("Hello User!")
})
app.listen(port)  // make the app actually run.

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const stripeSK = process.env.stripeSK
const stripePK = process.env.stripePK
//console.log(stripePK, stripeSK)

app.use(express.static('public'))

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