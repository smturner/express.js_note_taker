const express = require('express');
const fs = require('fs');

const path = require('path')
const app = express()
const PORT = 3001;
//this is middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use()
app.use(express.static('public'));


app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, './public/index.html'))
)

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get('/api/notes', (req, res) => 
   fs.readFile('./db/db.json', "utf8", (err, data) => {
    res.json(JSON.parse(data))
    if (err) throw err;
    console.log(data)
   }
));

app.post('/api/notes', (req, res))

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html')
));

app.listen(PORT, ()=> {
    console.log(`App listening at http://localhost:${PORT}`)
})