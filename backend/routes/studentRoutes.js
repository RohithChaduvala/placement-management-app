const express = require('express');
const router = express.Router();
const db = require('../db/pool'); // MySQL db connection

// ==================== 1. Get student profile by email ====================
// /student/profile/:email
router.get('/profile/:email', (req, res) => {
  console.log("=== INSIDE CORRECT PROFILE ROUTE ===");
  const email = req.params.email;
  const query = `
    SELECT name, email, roll_number, branch, course, cgpa, phone, profile_status, is_access_revoked
    FROM student_profiles
    WHERE email = ?
  `;
  console.log("Executing SQL:", query, "with email:", email);
  db.query(query, [email], (err, results) => {
    console.log("SQL Results:", results);
    if (err || results.length === 0) {
      return res.json({ success: false, message: "Profile not found" });
    }
    res.json({ success: true, profile: results[0] });
  });
});


// ==================== 2. Get eligible jobs for a student (by email) ====================
router.get('/eligible-jobs/:studentEmail', (req, res) => {
  const studentEmail = req.params.studentEmail;

  const studentQuery = `
    SELECT course, branch, cgpa, profile_status, is_access_revoked
    FROM student_profiles 
    WHERE email = ?
  `;

  const jobQuery = `
    SELECT * FROM job_posts 
    WHERE is_approved = 1 
      AND FIND_IN_SET(?, eligible_courses) 
      AND FIND_IN_SET(?, eligible_branches) 
      AND min_cgpa <= ?
  `;

  db.query(studentQuery, [studentEmail], (err, studentResult) => {
    if (err || studentResult.length === 0) {
      return res.status(500).json({ message: 'Student not found or error' });
    }

    const { course, branch, cgpa, profile_status, is_access_revoked } = studentResult[0];

    if (
      profile_status?.toLowerCase() !== 'approved' ||
      Number(is_access_revoked) === 1
    ) {
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


// ==================== 3. Get all approved jobs (for listing with eligibility status) ====================
router.get('/all-approved-jobs', (req, res) => {
  const query = `
  SELECT * FROM job_posts 
  WHERE is_approved = 1
  ORDER BY application_deadline ASC
`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching approved jobs:', err);
      return res.status(500).json({ error: 'Failed to fetch approved jobs' });
    }

    res.json({ jobs: results });
  });
});

router.put('/update-profile/:email', async (req, res) => {
  const { email } = req.params;
  const {
    phone,
    resume_url,
    github_url,
    linkedin_url,
    skills,
    portfolio_url,
  } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE student_profiles
       SET phone = ?, resume_url = ?, github_url = ?, linkedin_url = ?, skills = ?, portfolio_url = ?
       WHERE email = ?`,
      [phone, resume_url, github_url, linkedin_url, skills, portfolio_url, email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
