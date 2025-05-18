const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Vite frontend port
  credentials: true
}));

// MySQL Connection
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
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.execute(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB error", error: err });
    if (results.length > 0) {
      res.status(200).json({ success: true, message: "Login successful", user: results[0] });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  });
});

// Officer routes
const officerRoutes = require('./routes/officerRoutes');
app.use('/officer', officerRoutes);

const facultyRoutes = require('./routes/facultyRoutes');
app.use('/faculty', facultyRoutes);

const studentRoutes = require('./routes/studentRoutes');
app.use('/student', studentRoutes);

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
