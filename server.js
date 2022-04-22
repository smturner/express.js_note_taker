//required packages
const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const notesRoutes = require('./routes/notesRoutes')

const app = express()
const PORT = process.env.PORT || 3001;

//this is middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', notesRoutes);
app.use(express.static('public'));
app.use('/', htmlRoutes);

//how we open the server
app.listen(PORT, ()=> {
  console.log(`App listening at http://localhost:${PORT}`)
})



