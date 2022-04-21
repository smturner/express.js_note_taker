const express = require('express');
const fs = require('fs');
const db = require('./db/db.json')
const path = require('path')
// const api = require('./routes/notes')
const { readTheFile, getNotes } = require('./helpers/fsUtils')
var shortid = require('shortid'); 
// const notes = require('./routes/notes')


const app = express()
const PORT = process.env.PORT || 3001;

//this is middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', notes);
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) => {
res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', (req, res) => {
  readTheFile('./db/db.json', "utf8", (err, data) => {
    res.json(JSON.parse(data))
    if (err) throw err;
    console.log(data)
   }
)});

app.post('/api/notes', (req, res) => {
    // console.log(`${req.method} request received to add a new note`)
    const {title, text} = req.body;
    if (title && text) {
        const newNote= {
            title,
            text,
            id: shortid.generate()
            
        };
        console.log(newNote)
        getNotes(newNote, './db/db.json');

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

//   app.delete(`/api/notes/:id`, (req,res) => {
//     let savedNote = fs.readFile('./db/db.json', 'utf8');
//     savedNote=JSON.parse(savedNote);
//     // let noteId = req.params.id;
//     // let deletedNote= savedNote.filter(note => note.id !=noteId)
//     // console.log(deletedNote)

//     res.send ('delete note')

//   })



// const readAndAppend = (content, file) => {
//   fs.readFile(file, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//     } else {
//       const parsedData = JSON.parse(data);
//       parsedData.push(content);
//       writeToFile(file, parsedData);
//     }
//   });
// };

// const writeToFile = (destination, content) =>
//   fs.writeFile(destination, JSON.stringify(content, null, 1), (err) => {
//   if (err){
//     console.error(err);
//   }else {
//     console.info(`\nData written to ${destination}`)
//   }
// });

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html')
  ));

app.listen(PORT, ()=> {
    console.log(`App listening at http://localhost:${PORT}`)
})