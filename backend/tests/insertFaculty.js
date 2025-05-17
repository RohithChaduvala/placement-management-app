const mysql = require('mysql');
const bcrypt = require("bcrypt");
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const faculty = {
  name: "Dr. Ramesh Kumar",
  email: "faculty@example.com",
  password: "faculty123",
  department: "Computer Science"
};

bcrypt.hash(faculty.password, 10, (err, hash) => {
  if (err) throw err;

  const sql = `INSERT INTO faculties (name, email, password, department) VALUES (?, ?, ?, ?)`;
  const values = [faculty.name, faculty.email, hash, faculty.department];

  db.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log("Faculty inserted with ID:", result.insertId);
    db.end();
  });
});
