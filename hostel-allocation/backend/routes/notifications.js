const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:student_id', (req, res) => {
  db.query(
    'SELECT * FROM Notifications WHERE student_id=? ORDER BY created_at DESC',
    [req.params.student_id],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

router.put('/read/:student_id', (req, res) => {
  db.query(
    'UPDATE Notifications SET is_read=1 WHERE student_id=?',
    [req.params.student_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Marked as read' });
    }
  );
});

module.exports = router;