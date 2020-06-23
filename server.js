//Dependencies and packages needed to make application work
const express = require("express");

const path = require("path");

//Dependencies for routes
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

// Sets up the Express App
const app = express();

//Sets up PORT to be used
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing and link external JS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//allows server to use css and js
app.use(express.static(path.join(__dirname, "/public")));

//Set up Express app to use routes
app.use(htmlRoutes);
app.use(apiRoutes);

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });