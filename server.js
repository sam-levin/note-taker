const express = require ('express');
const app = express();
const {data} = require('./db/db.json')
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const { type } = require('os');
const uniqid = require('uniqid')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(data);
}) 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'))
})

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });

app.post('/api/notes', (req, res) => {
    // req.body is where incoming content will be
    req.body.id = uniqid();
    if (!validateNote(req.body)) {
        res.status(400).send("The note isn't properly formatted")
    } else {
        const note = createNewNote(req.body, data)
        res.json(note)    
    }
});

const createNewNote = (body, noteArray) => {
    const note = body;
    noteArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({data: noteArray}, null, 2)
    );
    return note;
}

const validateNote = note => {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.title !== 'string') {
        return false;
    }
    return true;
}