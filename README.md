# express.js_note_taker

1. create server.js file
        -import all your required dependencies 
        -const app = express()
        -***Make sure to set it up with heroku depoyment
        -set body parsing, static middleware, route middleware
        -code that starts your server(app.listen) 

2. create a routes folder
    -create a 'GET' route for '/notes' that returns the 'notes.html' file
    -create a GET route for '*' that returns 'index.html' file
    -create a GET route for '/api/notes' that returns all saved notes as JSON
    -create a POST route for '/api/notes' that saves a new note to the db.json file
    -create a delete route for '/api/ntoes/:id" that deletes a note form the db.json file (bonus requirement)

3. create helper functions that manage saving and retrieving notes from the db.json file
    -create a getNotes() function that returns all the saved notes from the db.json file
    -create a saveNote() function that savees a new note to the db.json file and returns the new note as a JSON
    -create a deleteNote() function that deletes a note form the db.json file and returns a sucess message

4. integrate your helper functions into the routes (use the functions in your get and post routes)

5. test the routes to ensure that they're working