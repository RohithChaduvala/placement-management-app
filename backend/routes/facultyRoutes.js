const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const bcrypt = require('bcrypt');

// Faculty Login Route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM faculties WHERE email = ?';
  pool.query(query, [email], async (err, results) => {
    if (err) {
      console.error('DB error during faculty login:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    const faculty = results[0];
    try {
      const isMatch = await bcrypt.compare(password, faculty.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      delete faculty.password;
      return res.status(200).json({ message: 'Login successful', faculty });

    } catch (bcryptErr) {
      console.error('Error comparing password:', bcryptErr);
      return res.status(500).json({ message: 'Server error' });
    }
  });
});

router.get("/unapproved-jobs", (req, res) => {
  const sql = "SELECT * FROM job_posts WHERE is_approved = FALSE";

  pool.query(sql, (err, results) => {  // changed from db.query to pool.query
    if (err) {
      console.error("Error fetching unapproved jobs:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.json({ jobs: results });
  });
});

// POST approve job
router.post("/approve-job/:id", (req, res) => {
  const jobId = req.params.id;
  const sql = "UPDATE job_posts SET is_approved = TRUE WHERE id = ?";

  pool.query(sql, [jobId], (err, result) => {  // changed from db.query to pool.query
    if (err) {
      console.error("Error approving job:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.json({ message: "Job approved successfully" });
  });
});


module.exports = router;
