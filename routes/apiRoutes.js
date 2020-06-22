//Linking routes to JSON file, db.json to pull(get), push(post) and delete to delete a specific note data

const app = require("express").Router();
const fs = require("fs");
const path = require("path");

const db = require("./db/db.json");

//API GET Request
//Sets up a route so notes that were saved are displayed on the webpage
app.get("/api/notes", function (req, res) {

    //res.sendFile(path.join(__dirname, "../db/db.json"))
    res.json(db);
});

//API POST Request
//A route used to save new notes to db.json file
app.post("/api/notes", function (req, res) {

    const newNote = req.body;

    console.log(newNote);

    //const jsonNewNote = JSON.stringify(newNote);//"{\"title\":\"d\",\"text\":\"d\",\"id\":\"477\"}"
    const savedNotes = JSON.parse(fs.readFileSync(__dirname + "/db/db.json", "utf8"));
    console.log(savedNotes);


    // savedNotes.push(newNote);
    // console.log(savedNotes);

    savedNotes.push(newNote);

    console.log(savedNotes);

    //db.push(newNote);

    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(savedNotes));

    return res.json(newNote);
});

//API DELETE Request
//A route to delete any notes when delete button is pressed by selecting the id
app.delete("/api/notes/:id", function (req, res) {

    //Holds resquest from user, narrowing in on the id
    let idNote = req.body.id;

    //Reads and parses db.json file to compare against requested id
    let dbParsed = JSON.parse(fs.readFileSync(db, "utf8"));


    dbParsed = dbParsed.filter(note => {
        return note.id != idNote;
    });

    //Stringify updated file and rewrite back to db.json
    fs.writeFileSync(db, JSON.stringify(dbParsed));
    //Send updated file back to client
    return res.json(dbParsed);


});

//export routes to be used in taker.js
module.exports = app;