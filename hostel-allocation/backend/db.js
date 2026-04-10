const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'P#&hhn?up2iV?HR',
  database: 'hostel_db'
});
db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});
module.exports = db;