const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI if hosted remotely

// Database Name
const dbName = 'IST256';

async function connectToDatabase() {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected successfully to MongoDB server');

        // Select the database
        const db = client.db(dbName);
        console.log(`Using database: ${dbName}`);

        // Perform operations here if needed
        return db;
    } catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
        // Ensure the client will close when you finish
        await client.close();
    }
}


