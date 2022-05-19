//Required packages
const router = require('express').Router();
const db = require('../db/db.json')
const { readTheFile, getNotes, saveNotes } = require('../helpers/fsUtils')
var shortid = require('shortid'); 

//gets the notes file
router.get('/notes', (req, res) => {
  readTheFile('./db/db.json', "utf8", (err, data) => {
    res.json(JSON.parse(data))
    if (err) throw err;
   }
)});

//posts the note to the db.json file
router.post('/notes', (req, res) => {
    const {title, text} = req.body;
    if (title && text) {
        const newNote= {
            title,
            text,
            id: shortid.generate()
            
        };
        getNotes(newNote, './db/db.json');

        const response= {
            status: "success",
            body: newNote,
        };
        res.status(201).json(response);
    }else{
        res.status(500).json('Error in posting new note')
    }
    });

    //delete route to delete notes
    router.delete('/notes/:id', (req,res) => {
        const noteId = req.params.id;
        console.log(noteId)
        readTheFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);
        saveNotes('./db/db.json', result);
        res.json(`Item ${noteId} has been deleted`) 
        })

    })


    module.exports=router;

