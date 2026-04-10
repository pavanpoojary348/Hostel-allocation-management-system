const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const students = require('./routes/students');
const rooms = require('./routes/rooms');
const allocations = require('./routes/allocations');

app.use('/api/students', students);
app.use('/api/rooms', rooms);
app.use('/api/allocations', allocations);

app.get('/test', (req, res) => res.json({ ok: true }));

app.listen(5000, () => {
  console.log('Server running on port 5000');
  console.log('Routes loaded: students, rooms, allocations');
});