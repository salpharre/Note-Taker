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
//allows server to use css and js
app.use(express.static(path.join(__dirname, "/public")));

//Pulls the files that contains routes to the JSON file, db.json, and routes to html files, index.html and notes.html
//require("./routes/apiRoutes")(app, fs, path);
require("./routes/htmlRoutes")(app);

app.get("/api/notes", function(req, res) {
        
    res.sendFile(path.join(__dirname, "./db/db.json"))
    //res.json(db);
  });

//API POST Request
//A route used to save new notes to db.json file
app.post("/api/notes", function(req, res) {

    const newNote = req.body;

    console.log(newNote);
    
    const savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    console.log(savedNotes);

    savedNotes.push(newNote);

    //db.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));

    return res.json(newNote);
  });

//API DELETE Request
//A route to delete any notes when delete button is pressed by selecting the id
app.delete("/api/notes/:id", function(req, res) {

    // //Holds resquest from user, narrowing in on the id
    // let idNote = req.body.id;

    // //Reads and parses db.json file to compare against requested id
    // let dbParsed = JSON.parse(fs.readFileSync(db, "utf8"));


    // dbParsed = dbParsed.filter(note => {
    //     return note.id != idNote;
    // });

    // //Stringify updated file and rewrite back to db.json
    // fs.writeFileSync(db, JSON.stringify(dbParsed));
    // //Send updated file back to client
    // return res.json(dbParsed);

    
  });

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });