const fs = require('fs');
const util= require('util');

const readTheFile = util.promisify(fs.readFile)
const writeTheFile = util.promisify(fs.writeFile)

const getNotes = (content, file) => {
    readTheFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        saveNotes(file, parsedData);
      }
    });
  };
  
  const saveNotes = (destination, content) => {
    writeTheFile(destination, JSON.stringify(content, null, 1), (err) => {
    if (err){
      console.error(err);
    }else {
      console.info(`\nData written to ${destination}`)
    }
  })
};

const removeNotes = (id) => {
  return this.getNotes()
    .then (notes => notes.filter(note => note.id != id))
    .then(fileteredNotes => this.write(fileteredNotes));
     
  // .then( (notes) => notes.filter((note) => note.id !=id))
  // .then((updatedNotes) => {(saveNotes('./db/db.json', updatedNotes))}

  }
  console.log(getNotes)
module.exports = { readTheFile, getNotes, saveNotes, removeNotes };