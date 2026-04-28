require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const students = require('./routes/students');
const rooms = require('./routes/rooms');
const allocations = require('./routes/allocations');
const notifications = require('./routes/notifications');
const waitlist = require('./routes/waitlist');
const year = parseInt(req.body.year);
const semester = parseInt(req.body.semester);
app.use('/api/students', students);
app.use('/api/rooms', rooms);
app.use('/api/allocations', allocations);
app.use('/api/notifications', notifications);
app.use('/api/waitlist', waitlist);

app.get('/test', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});