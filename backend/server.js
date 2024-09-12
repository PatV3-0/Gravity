const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'dist' folder
app.use(express.static('frontend/public'));

// Serve the index.html file for all routes
app.get('*', (req, res) => {
  res.sendFile('frontend/public/index.html');
});

const port = process.env.PORT || 3000;
app.listen(3000, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});