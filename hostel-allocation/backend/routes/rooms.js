const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM Rooms', (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});
router.post('/', (req, res) => {
  const { floor, capacity, price, block_id, room_type, ac_type, washroom } = req.body;
  db.query(
    'INSERT INTO Rooms (floor, capacity, price, block_id, room_type, ac_type, washroom, availability_status) VALUES (?,?,?,?,?,?,?,"Available")',
    [floor, capacity, price, block_id, room_type, ac_type, washroom],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: 'Room added successfully', id: result.insertId });
    }
  );
});
module.exports = router;