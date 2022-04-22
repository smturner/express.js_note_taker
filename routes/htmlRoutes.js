//required packages
const router = require('express').Router();
const path = require('path')

//route to the homepage
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})
//route to the notes page
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'))
});
//routes back to home page if user types in anything else
router.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html')
  ));


module.exports = router;


