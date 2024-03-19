const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const dbFilePath = path.join(__dirname, '..', 'db.json');

function readDbFile() {
  try {
    const dbData = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(dbData);
  } catch (error) {
    console.error('Error reading database file:', error);
    return [];
  }
}

function writeDbFile(data) {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data), 'utf8');
  } catch (error) {
    console.error('Error writing to database file:', error);
  }
}

router.get('/notes', (req, res) => {
  const currentNotes = readDbFile();
  res.json(currentNotes);
});

router.post('/notes', (req, res) => {
  const currentNotes = readDbFile();
  const newNote = { ...req.body, id: uuidv4() };
  currentNotes.push(newNote);
  writeDbFile(currentNotes);
  res.json(newNote);
});

router.delete('/notes/:id', (req, res) => {
  const currentNotes = readDbFile();
  const filteredNotes = currentNotes.filter(note => note.id !== req.params.id);
  writeDbFile(filteredNotes);
  res.json({ message: 'Note has been deleted' });
});

module.exports = router;
