const mysql = require('mysql');

require('dotenv').config();
const bcrypt = require("bcrypt");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const officer = {
  name: "Officer One",
  email: "officer1@example.com",
  password: "officer123",
  company_name: "Example Corp"
};

bcrypt.hash(officer.password, 10, (err, hash) => {
  if (err) throw err;
  const sql = `INSERT INTO officers (name, email, password, company_name) VALUES (?, ?, ?, ?)`;
  const values = [officer.name, officer.email, hash, officer.company_name];

  db.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log("Officer inserted with ID:", result.insertId);
    db.end();
  });
});
