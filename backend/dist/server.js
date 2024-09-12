"use strict";

var express = require('express');
var path = require('path');
var app = express();

// Serve static files from the 'dist' folder
app.use(express["static"]('frontend/public'));

// Serve the index.html file for all routes
app.get('*', function (req, res) {
  res.sendFile('frontend/public/index.html');
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});