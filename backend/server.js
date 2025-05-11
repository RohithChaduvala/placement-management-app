const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "user_management",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to the database.");
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Placement Management App Backend!");
});

// Student login route
app.post("/student-login", (req, res) => {
  const { email, password } = req.body;

  console.log(`Email: ${email}, Password: ${password}`); // Log inputs for debugging

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.execute(query, [email, password], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, message: "Database error", error: err });
    }

    if (results.length > 0) {
      res.status(200).json({ success: true, message: "Login successful", user: results[0] });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  });
});

// Fetch student profile after login
app.get("/student/profile/:email", (req, res) => {
  const { email } = req.params;

  const query = "SELECT roll_number, name, section, branch FROM student_profiles WHERE email = ?";
  db.execute(query, [email], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length > 0) {
      res.status(200).json({ success: true, profile: results[0] });
    } else {
      res.status(404).json({ success: false, message: "Student profile not found" });
    }
  });
});

// Start server (ALWAYS LAST LINE)
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
