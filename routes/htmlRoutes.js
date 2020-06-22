//Dependency for routes
const app = require("express").Router();
const path = require("path");


//Exporting routes as a module and passing app as a parameter, app is for express package

//HTML paths to the two different html files

//Path to note.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

//Defaults to starting page 
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;