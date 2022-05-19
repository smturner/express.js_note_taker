//required packages
const fs = require('fs');
const util= require('util');

//variables for writing and reading the files returning in a promise object
const readTheFile = util.promisify(fs.readFile)
const writeTheFile = util.promisify(fs.writeFile)

//function that reads the file, then creates it into a JavaScript object and then pushes the data back to the file. 


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
  
  //function that writes the data onto the file
  const saveNotes = (destination, content) => {
    writeTheFile(destination, JSON.stringify(content, null, 1), (err) => {
    if (err){
      console.error(err);
    }else {
      console.info(`\nData written to ${destination}`)
    }
  })
};


module.exports = { readTheFile, getNotes, saveNotes };