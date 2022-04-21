const express = require('express')
const router = express.Router()
// const express = require('express');
const fs = require('fs');
const db = require('./db/db.json')
const path = require('path')
// const api = require('./routes/notes')
const { readAndAppend } = require('../helpers/fsUtils')
var shortid = require('shortid'); 
// const notes = require('./routes/notes')



router.get('/notes', (req, res) => {
    fs.readFile(db, "utf8", (err, data) => {
    //  res.json(JSON.parse(data))
     if (err) throw err;
     console.log(data)
    }
 )});
 
 router.post('/notes', (req, res) => {
     console.log(`${req.method} request received to add a new note`)
     const {title, text} = req.body;
     if (title && text) {
         const newNote= {
             title,
             text,
             id: shortid.generate()
             
         };
         console.log(newNote)
         readAndAppend(newNote, './db/db.json');
 
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
 
   router.delete(`/api/notes/:id`, (req,res) => {
     let savedNote = fs.readFile('../db/db.json', 'utf8');
     savedNote=JSON.parse(savedNote);
     // let noteId = req.params.id;
     // let deletedNote= savedNote.filter(note => note.id !=noteId)
     // console.log(deletedNote)
 
     res.send ('delete note')
 
   })
   module.exports = router;


// const notes = require('express').Router();
// const { readAndAppend } = require('../helpers/fsUtils');
// const fs = require('fs');
// const db = require('../db/db.json')

// // var shortid = require('shortid'); 

// // const util = require('util')


// // const readFromFile = util.promisify(fs.readFile)

// notes.get('/api/notes', (req, res) => {
//     fs.readFile('../db/db.json', "utf8", (err, data) => {
//      res.json(JSON.parse(data))
//     //  if (err) throw err;
//      console.log(data)
//     }
//  )});
 
//  notes.post('/api/notes', (req, res) => {
//      // console.log(`${req.method} request received to add a new note`)
//      const {title, text} = req.body;
//      if (title && text) {
//          const newNote= {
//              title,
//              text,
//              // feedback_id:
//          };
//          readAndAppend(newNote, '../db/db.json');
 
//          const response= {
//              status: "success",
//              body: newNote,
//          };
//          console.log(response)
//          res.status(201).json(response);
//      }else{
//          res.status(500).json('Error in posting new note')
//      }
//      });

     
 
// //  const readAndAppend = (content, file) => {
// //    fs.readFile(file, 'utf8', (err, data) => {
// //      if (err) {
// //        console.error(err);
// //      } else {
// //        const parsedData = JSON.parse(data);
// //        parsedData.push(content);
// //        writeToFile(file, parsedData);
// //      }
// //    });
// //  };
 
// //  const writeToFile = (destination, content) =>
// //    fs.writeFile(destination, JSON.stringify(content, null, 1), (err) => {
// //    if (err){
// //      console.error(err);
// //    }else {
// //      console.info(`\nData written to ${destination}`)
// //    }
// //  });
 
// module.exports = notes;