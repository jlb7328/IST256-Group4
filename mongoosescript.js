const mongoose = require('mongoose'); // require Mongoose for MongoDB.
const express = require('express'); // require the express library to be downloaded.

const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholders in the connection string uri with your credentials
require('dotenv').config();
const uri = process.env.DBuri;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    //Bring List of DB's Connected
    const databasesList = await client.db().admin().listDatabases();
    console.table(databasesList.databases);
  }catch(error) {
console.error("Error connecting to MongoDB:", error); // catch error and display message if MongoDB connection is unsuccessful.
  }finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);