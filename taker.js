//Dependencies and packages needed to make application work
const express = require("express");
const fs = require("fs");
const path = require("path");

// Sets up the Express App
const app = express();

//Sets up PORT to be used
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing and link external JS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

//Pulls the files that contains routes to the JSON file, db.json, and routes to html files, index.html and notes.html
require("./routes/apiRoutes");
require("./routes/htmlRoutes");


// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });