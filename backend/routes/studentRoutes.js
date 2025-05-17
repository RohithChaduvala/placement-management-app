const express = require('express');
const router = express.Router();
const db = require('../db'); // MySQL db connection

// ==================== 1. Get student profile by email ====================
router.get('/profile/:email', (req, res) => {
  const { email } = req.params;

  const query = `
    SELECT roll_number, name, section, branch, course, email, phone, cgpa, profile_status, is_access_revoked
    FROM student_profiles 
    WHERE email = ?
  `;

  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ message: 'Profile not found' });

    res.status(200).json({ success: true, profile: results[0] });
  });
});

// ==================== 2. Get eligible jobs for a student ====================
router.get('/eligible-jobs/:rollNumber', (req, res) => {
  const rollNumber = req.params.rollNumber;

  const studentQuery = `
    SELECT course, branch, cgpa, profile_status, is_access_revoked
    FROM student_profiles 
    WHERE roll_number = ?
  `;

  const jobQuery = `
    SELECT * FROM job_posts 
    WHERE is_approved = 1 
      AND FIND_IN_SET(?, eligible_courses) 
      AND FIND_IN_SET(?, eligible_branches) 
      AND min_cgpa <= ?
  `;

  db.query(studentQuery, [rollNumber], (err, studentResult) => {
    if (err || studentResult.length === 0) {
      return res.status(500).json({ message: 'Student not found or error' });
    }

    const { course, branch, cgpa, profile_status, is_access_revoked } = studentResult[0];

    if (profile_status !== 'Approved' || is_access_revoked) {
      return res.json({ jobs: [] }); // not eligible to view jobs
    }

    db.query(jobQuery, [course, branch, cgpa], (err2, jobResults) => {
      if (err2) {
        return res.status(500).json({ message: 'Error fetching jobs' });
      }
      res.json({ jobs: jobResults });
    });
  });
});

// ==================== 3. Update student profile (phone number) ====================
router.put('/update-profile', (req, res) => {
  const { email, phone } = req.body;

  const query = 'UPDATE student_profiles SET phone = ? WHERE email = ?';

  db.query(query, [phone, email], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to update profile" });

    res.json({ success: true, message: "Profile updated" });
  });
});

module.exports = router;
