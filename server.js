const express = require('express');
const fs = require('fs');
const db = require('./db/db.json')
const path = require('path')
const { readTheFile, getNotes } = require('./helpers/fsUtils')
var shortid = require('shortid'); 
// const notes = require('./routes/notes.js')


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
    // console.log(data)
   }
)});

app.post('/api/notes', (req, res) => {
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

    app.delete('/api/notes/:id', function(req, res) {
      readTheFile(path.join(__dirname, "./db/db.json"), 'utf-8', (err, data) => {
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
        fs.writeFile(path.join(__dirname, "./db/db.json"), notesJSON, (err) => {
          if (err) {
             console.log(err);
          }
          console.log('Your note has been deleted!')
        //   // return notesJSON
        })

      })
    })


app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html')
  ));

app.listen(PORT, ()=> {
    console.log(`App listening at http://localhost:${PORT}`)
})