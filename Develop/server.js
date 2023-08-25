const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 

app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    const newNote = req.body;
    newNote.id = Date.now();
    notes.push(newNote);
    fs.writeFileSync('db.json', JSON.stringify(notes, null, 2));
    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    const noteId = parseInt(req.params.id);
    const updatedNotes = notes.filter(note => note.id !== noteId);
    fs.writeFileSync('db.json', JSON.stringify(updatedNotes, null, 2));
    res.sendStatus(200);
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});