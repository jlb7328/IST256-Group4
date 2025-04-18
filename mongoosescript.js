const mongoose = require('mongoose'); // require Mongoose for MongoDB.
const express = require('express'); // require the express library to be downloaded.
const dotenv = require('dotenv'); // require dotenv to load environment variables.




const uri = "mongodb+srv://gate-logistics.3fvmnet.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&appName=GATE-Logistics";

//Current cirt good until: 10/18/25
const credentials = "/DBcirtificate";

const clientOptions = {
  tlsCertificateKeyFile: credentials,
  serverApi: { version: '1', strict: true, deprecationErrors: true }
};

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);

