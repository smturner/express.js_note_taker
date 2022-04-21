const router = require('express').Router();
const path = require('path')


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })
  
  router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'))
  });

  router.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html')
  ));


module.exports = router;


// const notesRouter = require('./notes')

// const app = express();

// // app.use('/notes', notesRouter)

// module.exports=app