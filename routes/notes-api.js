const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils')

router.get('/api/notes', (req,res) => {
    readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)))
});



module.exports = router;