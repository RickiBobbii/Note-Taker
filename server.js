const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

//middleware for body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () =>
    console.log(`Server on port ${PORT}`)
);