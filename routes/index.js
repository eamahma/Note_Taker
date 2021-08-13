const notes = require('express').Router();
const fs = require('fs');
const { v4 : uuidv4 } = require('uuid');

notes.get('/notes', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db/db.json'));
    res.json(data);
})

notes.post('/notes', (req, res) => {
    const note_id = req.body;
    note_id.id = uuidv4();
    const data = JSON.parse(fs.readFileSync('db/db.json'));
    data.push(note_id);
    fs.writeFileSync('db/db.json', JSON.stringify(data));
    res.json(data);
})

notes.delete('/notes/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db/db.json'));
    const note_id = req.params.id;
    const delete_note = data.filter(note => (note.id !== note_id));
    fs.writeFileSync('db/db.json', JSON.stringify(delete_note));
    res.json(data);
})

module.exports = notes;
