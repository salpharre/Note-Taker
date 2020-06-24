//Dependencies and packages needed to make application work
const express = require("express");

//Dependencies for routes
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

// Sets up the Express App
const app = express();

//Sets up PORT to be used
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing and link external JS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//allows server to use css and js and access public files
app.use(express.static("public"));

//Set up Express app to use routes
app.use(htmlRoutes);
app.use(apiRoutes);

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });