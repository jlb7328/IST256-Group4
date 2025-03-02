//This file acts as a temp api since the website does not actually exist.
/*
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

const fileName = path.join(__dirname, 'data.json');

app.post('/save', (req, res) => {
  // Read the existing JSON file
  fs.readFile(fileName, 'utf8', (err, data) => {
    let jsonArray = [];

    if (!err && data) {
      try {
        jsonArray = JSON.parse(data);
        if (!Array.isArray(jsonArray)) {
          jsonArray = [jsonArray];
        }
      } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
        jsonArray = [];
      }
    }

    // Append new data to the array
    jsonArray.push(req.body);

    // Write the updated array back to the file
    fs.writeFile(fileName, JSON.stringify(jsonArray, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing file:', writeErr);
        return res.status(500).send('Error saving data');
      }
      res.send('Data saved successfully!');
    });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/
//temp same machine work is just on sign_up.html
