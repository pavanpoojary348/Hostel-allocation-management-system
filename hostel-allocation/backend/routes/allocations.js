const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query(
    `SELECT a.allocation_id, s.name, r.room_id, r.floor, a.status
     FROM Allocations a
     JOIN Students s ON a.student_id = s.student_id
     JOIN Rooms r ON a.room_id = r.room_id`,
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

router.post('/', (req, res) => {
  const { student_id, room_id } = req.body;
  const date = new Date().toISOString().split('T')[0];
  db.query(
    'INSERT INTO Allocations (allocation_date, status, student_id, room_id) VALUES (?,?,?,?)',
    [date, 'Confirmed', student_id, room_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      db.query('UPDATE Rooms SET availability_status="Occupied" WHERE room_id=?', [room_id]);
      res.json({ message: 'Allocated successfully' });
    }
  );
});

module.exports = router;