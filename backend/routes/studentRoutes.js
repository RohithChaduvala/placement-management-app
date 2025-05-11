const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your MySQL db connection

// Get student profile by email
router.get('/profile/:email', (req, res) => {
  const { email } = req.params;
  const query = 'SELECT * FROM student_profiles WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error fetching student profile:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(results[0]);
  });
});

module.exports = router;
