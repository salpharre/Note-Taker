//Linking routes to JSON file, db.json to pull(get) and push(post) data from it

//Require json file, db.json for routes to change

const db = require("../db/db.json");


//export routes to be used in taker.js

module.exports = function (app, fs) {

    //API GET Request
    //Sets up a route so notes that were saved are displayed on the webpage
    app.get("/api/notes", function(req, res) {
        
        res.json(db);
      });

    //API POST Request
    //A route used to save new notes to db.json file
    app.post("/api/notes", function(req, res) {

        //const savedNotes = JSON.parse(fs.readFileSync(db, "utf8"));

        const newNote = req.body;

        //savedNotes.push(newNote);

        db.push(newNote);

        //fs.writeFileSync(db, JSON.stringify(savedNotes));

        //res.json(newNote);
      });
    
    //API DELETE Request
    //A route to delete any notes when delete button is pressed by selecting the id
    app.delete("/api/notes/:id", function(req, res) {

        //Holds resquest from user, narrowing in on the id
        const idNote = req.params.id;

        //Reads and parses db.json file to compare against requested id
        const dbParsed = JSON.parse(fs.readFileSync(db, "utf8"));

        //Loop through each object in the array to compare requested id with ids in parsed file
        //If id is found, note object is emptied (erased)
        for (const i = 0; i < dbParsed.length; i++) {
            if (idNote === dbParsed[i].id) {
                dbParsed[i] = {};

                //Stringify updated file and rewrite back to db.json
                fs.writeFileSync(db, JSON.stringify(dbParsed));
                //Send updated file back to client
                return res.json(dbParsed);
            }
        }
      });
};