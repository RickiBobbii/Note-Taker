const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

//GET api route
router.get('/api/notes', (req,res) => {
    readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)))
});

//GET uuid from db.json
router.get('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
  });
  
//DELETE uuid from db.json
router.delete('/api/notes/:id', (req, res) => {
    const deleteId = req.params.id;
    readFromFile('db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all notes except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== deleteId);
  
        // Save that array to the filesystem
        writeToFile('db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Note ID ${deleteId} has been deleted`);
      });
  });
  
//POST new note to db.json
router.post('/api/notes', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, 'db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
  });

module.exports = router;