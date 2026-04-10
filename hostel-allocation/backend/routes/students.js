const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM Students', (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { name, gender, year, department, budget } = req.body;
  db.query(
    'INSERT INTO Students (name,gender,year,department,budget) VALUES (?,?,?,?,?)',
    [name, gender, year, department, budget],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Student registered', id: result.insertId });
    }
  );
});

module.exports = router;