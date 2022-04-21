const express = require('express')
const router = express.Router()
const fs = require('fs');
const db = require('../db/db.json')
// const path = require('path')
// const api = require('./routes/notes')
const { readTheFile, getNotes } = require('../helpers/fsUtils')
var shortid = require('shortid'); 
// const notes = require('./routes/notes')


// router.use('../db/db.json', db)
router.get('/api/notes', (req, res) => {
  readTheFile('../db/db.json', "utf8", (err, data) => {
    res.json(JSON.parse(data))
    if (err) throw err;
    console.log(data)
   }
)});

router.post('/api/notes', (req, res) => {
    // console.log(`${req.method} request received to add a new note`)
    const {title, text} = req.body;
    if (title && text) {
        const newNote= {
            title,
            text,
            id: shortid.generate()  
        };
        console.log(newNote)
        getNotes(newNote, '../db/db.json');

        const response= {
            status: "success",
            body: newNote,
        };
        console.log(response)
        res.status(201).json(response);
    }else{
        res.status(500).json('Error in posting new note')
    }
    });
 
//    router.delete(`/api/notes/:id`, (req,res) => {
//      let savedNote = fs.readFile('../db/db.json', 'utf8');
//      savedNote=JSON.parse(savedNote);
//      // let noteId = req.params.id;
//      // let deletedNote= savedNote.filter(note => note.id !=noteId)
//      // console.log(deletedNote)
 
//      res.send ('delete note')
 
//    })
   module.exports = router;


