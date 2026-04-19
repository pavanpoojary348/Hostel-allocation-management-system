const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM Students', (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

router.post('/register', (req, res) => {
  const { name, gender, year, department, budget, usn, course, semester, branch, mobile, password } = req.body;
  db.query(
    'INSERT INTO Students (name,gender,year,department,budget,usn,course,semester,branch,mobile,password) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
    [name, gender, year, department, budget, usn, course, semester, branch, mobile, password],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: 'Student registered successfully', id: result.insertId });
    }
  );
});

router.post('/login', (req, res) => {
  const { usn, password } = req.body;
  db.query('SELECT * FROM Students WHERE usn=? AND password=?', [usn, password], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    if (rows.length === 0) return res.status(401).json({ message: 'Invalid USN or password' });
    res.json({ message: 'Login successful', student: rows[0] });
  });
});

router.post('/preferences', (req, res) => {
  const { student_id, preferred_floor, preferred_block, max_budget, roommate_preference } = req.body;
  db.query(
    'INSERT INTO Preferences (student_id, preferred_floor, preferred_block, max_budget, roommate_preference) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE preferred_floor=?, preferred_block=?, max_budget=?, roommate_preference=?',
    [student_id, preferred_floor, preferred_block, max_budget, roommate_preference, preferred_floor, preferred_block, max_budget, roommate_preference],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: 'Preferences saved' });
    }
  );
});
router.put('/:id', (req, res) => {
  const { name, mobile, branch, semester, year } = req.body;
  db.query(
    'UPDATE Students SET name=?, mobile=?, branch=?, semester=?, year=? WHERE student_id=?',
    [name, mobile, branch, semester, year, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: 'Profile updated' });
    }
  );
});
router.put('/:id', (req, res) => {
  const { name, mobile, branch, semester, year } = req.body;
  db.query(
    'UPDATE Students SET name=?, mobile=?, branch=?, semester=?, year=? WHERE student_id=?',
    [name, mobile, branch, semester, year, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: 'Profile updated' });
    }
  );
});
module.exports = router;