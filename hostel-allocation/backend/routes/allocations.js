const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query(
    `SELECT a.allocation_id, s.name, s.usn, r.room_id, r.floor, a.status
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
      db.query(
        'INSERT INTO Notifications (student_id, message) VALUES (?, ?)',
        [student_id, '🎉 Your room has been allocated! Check your dashboard for details.']
      );
      res.json({ message: 'Allocated successfully' });
    }
  );
});

router.get('/student/:id', (req, res) => {
  const { id } = req.params;
  db.query(
    `SELECT a.allocation_id, r.room_id, r.floor, r.price, a.status
     FROM Allocations a
     JOIN Rooms r ON a.room_id = r.room_id
     WHERE a.student_id = ?`,
    [id],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      if (rows.length === 0) return res.status(404).json(null);
      res.json(rows[0]);
    }
  );
});

router.post('/auto-allocate', (req, res) => {
  db.query(
    `SELECT s.student_id, s.gender, s.budget 
     FROM Students s
     LEFT JOIN Allocations a ON s.student_id = a.student_id
     WHERE a.allocation_id IS NULL
     ORDER BY s.priority_score DESC`,
    (err, students) => {
      if (err) return res.status(500).json({ message: err.message });
      if (students.length === 0) return res.json({ message: 'No unallocated students' });

      let allocated = 0;
      let pending = students.length;

      students.forEach(student => {
        const block = student.gender === 'Male' ? 1 : 2;
        db.query(
          `SELECT r.room_id FROM Rooms r
           WHERE r.availability_status = 'Available'
           AND r.price <= ? AND r.block_id = ?
           LIMIT 1`,
          [student.budget, block],
          (err2, rooms) => {
            pending--;
            if (!err2 && rooms.length > 0) {
              const room_id = rooms[0].room_id;
              const date = new Date().toISOString().split('T')[0];
              db.query(
                'INSERT INTO Allocations (allocation_date, status, student_id, room_id) VALUES (?,?,?,?)',
                [date, 'Confirmed', student.student_id, room_id],
                () => {
                  db.query('UPDATE Rooms SET availability_status="Occupied" WHERE room_id=?', [room_id]);
                  db.query(
                    'INSERT INTO Notifications (student_id, message) VALUES (?, ?)',
                    [student.student_id, '🎉 Your room has been allocated! Check your dashboard for details.']
                  );
                  allocated++;
                }
              );
            }
            if (pending === 0) {
              setTimeout(() => res.json({ message: `Auto allocation done! ${allocated} students allocated.` }), 500);
            }
          }
        );
      });
    }
  );
});

module.exports = router;