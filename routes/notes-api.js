const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils')

router.get('/api/notes', (req,res) => {
    readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)))
});

//
router.post('/api/notes', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
      };
  
      readAndAppend(newNote, 'db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
  });

module.exports = router;