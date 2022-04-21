const fs = require('fs');
const util= require('util');

const readTheFile = util.promisify(fs.readFile)

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };
  
  const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 1), (err) => {
    if (err){
      console.error(err);
    }else {
      console.info(`\nData written to ${destination}`)
    }
  });


module.exports = { readTheFile, readAndAppend, writeToFile };