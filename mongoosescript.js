const mongoose = require('mongoose'); // require Mongoose for MongoDB.
const express = require('express'); // require the express library to be downloaded.
const dotenv = require('dotenv'); // require dotenv to load environment variables.
const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholders in the connection string uri with your credentials
const uri = "mongodb+srv://Assignment11Observer:me8Csn7v8ddMm34A@<cluster-url>?retryWrites=true&w=majority";

// Create a client with options to specify Stable API Version 1
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
