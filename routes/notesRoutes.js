const router = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json')
const path = require('path')
const { readTheFile, getNotes } = require('../helpers/fsUtils')
var shortid = require('shortid'); 


router.get('/notes', (req, res) => {
  readTheFile('../db/db.json', "utf8", (err, data) => {
    res.json(JSON.parse(data))
    if (err) throw err;
    // console.log(data)
   }
)});

router.post('/notes', (req, res) => {
    const {title, text} = req.body;
    if (title && text) {
        const newNote= {
            title,
            text,
            id: shortid.generate()
            
        };
        // console.log(newNote)
        getNotes(newNote, '../db/db.json');

        const response= {
            status: "success",
            body: newNote,
        };
        // console.log(response)
        res.status(201).json(response);
    }else{
        res.status(500).json('Error in posting new note')
    }
    });

    router.delete('/notes/:id', function(req, res) {
      readTheFile(path.join(__dirname, "../db/db.json"), 'utf-8', (err, data) => {
        res.json(JSON.parse(data))
        if (err){
          console.log(err)
        }
        // console.log('File data:', data);
        let notes= JSON.parse(data);
        notes.splice(req.params.id, 1)
        console.log(notes)
        let notesJSON= JSON.stringify(notes);
        console.log(notesJSON)
        fs.writeFile(path.join(__dirname, "../db/db.json"), notesJSON, (err) => {
          if (err) {
             console.log(err);
          }
          console.log('Your note has been deleted!')
        //   // return notesJSON
        })

      })
    })

    module.exports=router;

