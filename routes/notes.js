const notes = require('express').Router()
const { readAndAppend } = require('../helpers/fsUtils')
const fs = require('fs')
// const util = require('util')


// const readFromFile = util.promisify(fs.readFile)

notes.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', "utf8", (err, data) => {
     res.json(JSON.parse(data))
    //  if (err) throw err;
     console.log(data)
    }
 )});
 
 notes.post('/api/notes', (req, res) => {
     // console.log(`${req.method} request received to add a new note`)
     const {title, text} = req.body;
     if (title && text) {
         const newNote= {
             title,
             text,
             // feedback_id:
         };
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
 
//  const readAndAppend = (content, file) => {
//    fs.readFile(file, 'utf8', (err, data) => {
//      if (err) {
//        console.error(err);
//      } else {
//        const parsedData = JSON.parse(data);
//        parsedData.push(content);
//        writeToFile(file, parsedData);
//      }
//    });
//  };
 
//  const writeToFile = (destination, content) =>
//    fs.writeFile(destination, JSON.stringify(content, null, 1), (err) => {
//    if (err){
//      console.error(err);
//    }else {
//      console.info(`\nData written to ${destination}`)
//    }
//  });
 