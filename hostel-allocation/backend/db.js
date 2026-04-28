const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'hostel_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});

module.exports = db;