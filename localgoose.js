const mongoose = require('mongoose'); // require Mongoose for MongoDB.

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})  // connect to MongoDB using Mongoose.
  .then(() => console.log("MongoDB connected successfully.")) // display message if MongoDB connection is successful.
  .catch((err) => console.error("MongoDB connection error:", err))  // catch error and display message if MongoDB connection is unsuccessful.