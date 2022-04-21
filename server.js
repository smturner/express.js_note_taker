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

    app.delete('/api/notes/:id', function(req, res) {
      readTheFile(path.join(__dirname, "./db/db.json"), 'utf-8', (err, data) => {
        if (err){
          console.log(err)
        }
        console.log('File data:', data);
        let notes= JSON.parse(data);
        notes.splice(req.params.id, 1)
        let notesJSON= JSON.stringify(notes);
        fs.writeFile(path.join(__dirname, "./db/db.json"), notesJSON, (err) => {
          if (err) {
            return console.log(err);
          }
          console.log('Success!', notesJSON)
          return notesJSON
        })

      })
    })

  //   app.delete("/api/notes/:id", function (req, res) {
  //       db
  //     console.log("Req.params:", req.params.id);
  //     let deletedNote = parseInt(req.params.id);
  //     console.log(deletedNote);
  
  //     for (let i = 0; i < db.length; i++) {
  //         if (deletedNote === db[i].id) {
  //             db.splice(i, 1);
  
  //             let noteJson = JSON.stringify(db, null, 2);
  //             console.log(noteJson);
  //             fs.writeFile("./db/db.json", noteJson, function (err) {
  //                 if (err) throw err;
  //                 console.log("Your note has been deleted!");
  //                 res.json(db);
  //             });
  //         }
  //     }
  // });

  // app.delete(`/api/notes/:id`, (req,res) => {
  //   console.log(shortid())
  //   console.log('req.params:', req.params);
  //   let deleteNote = parseInt(req.params.id)
  //   let savedNote = fs.readFile('./db/db.json', 'utf8');
  //   savedNote=JSON.parse(savedNote);
  //   // let noteId = req.params.id;
  //   // let deletedNote= savedNote.filter(note => note.id !=noteId)
  //   // console.log(deletedNote)

  //   res.send ('delete note')

  // })


app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html')
  ));

app.listen(PORT, ()=> {
    console.log(`App listening at http://localhost:${PORT}`)
})