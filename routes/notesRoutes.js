//Required packages
const router = require('express').Router();
const db = require('../db/db.json')
const { readTheFile, getNotes, } = require('../helpers/fsUtils')
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

    // router.delete('/notes/:id', function(req, res) {
    //     removeNotes(req.params.id).then (() =>{
    //                 res.json({ok:true})
                 

    //     })    .catch ( (err) =>
    //         console.log(err))
          

    

    // })

    module.exports=router;

