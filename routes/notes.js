const notes = require('express').Router();
const fs = require('fs');
const { v4 : uuidv4 } = require('uuid');
const notes = require('express').Router();

// read all notes
notes.get('/', (req, res) => {
    // read existing database content
    const data = JSON.parse(fs.readFileSync('db/db.json'));
    // send back complete data to client
    res.json(data);
})

// write new note to database
notes.post('/, (req, res) => {
    // read content and assign to note 
    const note = req.body;
    // assign new id
    note.id = uuidv4();
    // read existing database content
    const data = JSON.parse(fs.readFileSync('db/db.json'));
    // add new not to existing data
    data.push(note);
    // write updated data back to database
    fs.writeFileSync('db/db.json', JSON.stringify(data));
    // send back complete data to client
    res.json(data);
})

notes.delete('/:id', (req, res) => {
    // read existing database content
    const data = JSON.parse(fs.readFileSync('db/db.json'));
    // extract note_id from entered parameter id
    const note_id = req.params.id;
    // create a new data excluding the one match entered id
    const delete_note = data.filter(note => (note.id !== note_id));
    // write to db.json as new file
    fs.writeFileSync('db/db.json', JSON.stringify(delete_note));
   // send back complete data to client
   res.json(data);
})

module.exports = notes;