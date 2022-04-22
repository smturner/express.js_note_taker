const router = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json')
const path = require('path')
const { readTheFile, getNotes, removeNotes } = require('../helpers/fsUtils')
var shortid = require('shortid'); 


router.get('/notes', (req, res) => {
  readTheFile('./db/db.json', "utf8", (err, data) => {
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
        getNotes(newNote, './db/db.json');

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
        removeNotes(req.params.id).then (() =>{
                    res.json({ok:true})
                 

        })    .catch ( (err) =>
            console.log(err))
          

    

    })

    module.exports=router;

