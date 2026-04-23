const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query(
    `SELECT w.waitlist_id, s.name, s.usn, s.branch, s.semester, s.budget, w.status, w.requested_at
     FROM Waitlist w
     JOIN Students s ON w.student_id = s.student_id
     ORDER BY w.requested_at ASC`,
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

router.post('/', (req, res) => {
  const { student_id } = req.body;
  db.query('SELECT * FROM Waitlist WHERE student_id=? AND status="Waiting"', [student_id], (err, rows) => {
    if (rows && rows.length > 0) return res.status(400).json({ message: 'Already in waitlist' });
    db.query('INSERT INTO Waitlist (student_id) VALUES (?)', [student_id], (err2) => {
      if (err2) return res.status(500).json({ message: err2.message });
      db.query(
        'INSERT INTO Notifications (student_id, message) VALUES (?, ?)',
        [student_id, '⏳ You have been added to the waitlist. We will notify you when a room is available.']
      );
      res.json({ message: 'Added to waitlist' });
    });
  });
});

router.put('/allocate/:waitlist_id', (req, res) => {
  const { waitlist_id } = req.params;
  const { room_id } = req.body;
  db.query('SELECT student_id FROM Waitlist WHERE waitlist_id=?', [waitlist_id], (err, rows) => {
    if (err || rows.length === 0) return res.status(404).json({ message: 'Not found' });
    const student_id = rows[0].student_id;
    const date = new Date().toISOString().split('T')[0];
    db.query(
      'INSERT INTO Allocations (allocation_date, status, student_id, room_id) VALUES (?,?,?,?)',
      [date, 'Confirmed', student_id, room_id],
      (err2) => {
        if (err2) return res.status(500).json({ message: err2.message });
        db.query('UPDATE Rooms SET availability_status="Occupied" WHERE room_id=?', [room_id]);
        db.query('UPDATE Waitlist SET status="Allocated" WHERE waitlist_id=?', [waitlist_id]);
        db.query(
          'INSERT INTO Notifications (student_id, message) VALUES (?, ?)',
          [student_id, '🎉 Great news! A room has been allocated to you from the waitlist!']
        );
        res.json({ message: 'Allocated from waitlist' });
      }
    );
  });
});

module.exports = router;