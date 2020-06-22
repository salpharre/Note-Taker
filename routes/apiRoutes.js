//Dependencies
const app = require("express").Router();
const fs = require("fs");
const path = require("path");
//requires json file path
const db = require("./db/db.json");

//API GET Request
//Sets up a route so notes that were saved are displayed on the webpage
app.get("/api/notes", function (req, res) {
//reads json file and sends it back to client
    res.json(db);
});

//API POST Request
//A route used to save new notes to db.json file
app.post("/api/notes", function (req, res) {
//holds note object
    const newNote = req.body;
//parses json file 
    const savedNotes = JSON.parse(fs.readFileSync(__dirname + "/db/db.json", "utf8"));
//pushes note object to parsed json array
    savedNotes.push(newNote);
//stringify's updated parsed json array and rewrites json file
    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(savedNotes));
//returns note back to client
    return res.json(newNote);
});

//API DELETE Request
//A route to delete any notes when delete button is pressed by selecting the id
app.delete("/api/notes/:id", function (req, res) {

    //Holds resquest from user, narrowing in on the id
    let idNote = req.params.id;

    //Reads and parses db.json file to compare against requested id
    let dbParsed = JSON.parse(fs.readFileSync(__dirname + "/db/db.json", "utf8"));

    //filters through parsed array to only return objects that don't match the id of the note to be deleted, and as such is subsequently deleted
    dbParsed = dbParsed.filter(note => {
        return note.id != idNote;
    });

    //Stringify updated file and rewrite back to db.json
    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(dbParsed));
    //Send updated file back to client
    return res.json(dbParsed);

});

//export routes to be used in taker.js
module.exports = app;