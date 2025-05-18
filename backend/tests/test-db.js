const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'user_management',
  connectionLimit: 10,
});

pool.query(
  "SELECT name, email, roll_number, branch, course, cgpa, phone, profile_status, is_access_revoked FROM student_profiles WHERE email = ?",
  ['22eg105n15@anurag.edu.in'],
  (err, results) => {
    if (err) {
      console.error("DB Error:", err);
    } else {
      console.log("Direct Query Results:", results);
    }
    process.exit();
  }
);