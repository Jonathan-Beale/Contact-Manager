// Setting up a basic Express.js server

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./database'); // Import the MySQL connection

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
