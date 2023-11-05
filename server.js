const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
//import routes
const notesRouter = require('./routes/notes');
const apiRouter = require('./routes/notes-api');

//middleware for body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//use routes
app.use(notesRouter);
app.use(apiRouter);

app.listen(PORT, () =>
    console.log(`Server on port http://localhost:${PORT}`)
);