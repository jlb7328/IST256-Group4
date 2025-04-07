const fs = require('fs');
const express = require('express');

const app = express();

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