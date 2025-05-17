const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

// ===================
// Officer Login Route
// ===================
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login request:', email, password);

  const query = 'SELECT * FROM officers WHERE email = ?';
  pool.query(query, [email], async (err, results) => {
    if (err) {
      console.error('DB error during login:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Officer not found' });
    }

    const officer = results[0];
    const isMatch = await bcrypt.compare(password, officer.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    delete officer.password;
    return res.status(200).json({ message: 'Login successful', officer });
  });
});

// ===================
// Officer Posts a Job
// ===================
router.post(
  '/jobs',
  [
    body('email').isEmail(),
    body('job_title').notEmpty(),
    body('job_description').notEmpty(),
    body('required_skills').notEmpty(),
    body('eligible_branches').notEmpty(),
    body('eligible_courses').notEmpty(),
    body('min_cgpa').isFloat({ min: 0, max: 10 }),
    body('application_deadline').isISO8601().toDate(),
    body('job_location').notEmpty(),
    body('package_offered').notEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }

    const {
      email,
      job_title,
      job_description,
      required_skills,
      eligible_branches,
      eligible_courses,
      min_cgpa,
      application_deadline,
      job_location,
      package_offered,
      registration_form = []
    } = req.body;

    const officerQuery = 'SELECT id FROM officers WHERE email = ?';
    pool.query(officerQuery, [email], (err, results) => {
      if (err) {
        console.error('Error fetching officer ID:', err);
        return res.status(500).json({ message: 'Database error fetching officer' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Officer not found' });
      }

      const officer_id = results[0].id;

      const insertQuery = `
        INSERT INTO job_posts (
          officer_id, job_title, job_description, required_skills,
          eligible_branches, eligible_courses, min_cgpa, application_deadline,
          job_location, package_offered, registration_form
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        officer_id,
        job_title,
        job_description,
        required_skills,
        eligible_branches,
        eligible_courses,
        min_cgpa,
        application_deadline,
        job_location,
        package_offered,
        JSON.stringify(registration_form)
      ];

      pool.query(insertQuery, values, (err, result) => {
        if (err) {
          console.error('Error inserting job post:', err.sqlMessage || err.message);
          return res.status(500).json({ message: 'DB error inserting job post', error: err.message });
        }

        res.status(201).json({ message: 'Job posted successfully', jobId: result.insertId });
      });
    });
  }
);

// ==============================
// View Jobs Posted by Officer
// ==============================
router.get('/jobs', (req, res) => {
  const email = req.query.email;

  const query = `
    SELECT * FROM job_posts 
    WHERE officer_id = (
      SELECT id FROM officers WHERE email = ?
    )
    ORDER BY created_at DESC
  `;

  pool.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error fetching posted jobs:', err);
      return res.status(500).json({ message: 'Error retrieving jobs' });
    }

    res.json({ jobs: results });
  });
});

// ==========================
// Delete Job by Job ID
// ==========================
router.delete('/delete-job/:jobId', (req, res) => {
  const { jobId } = req.params;

  const query = 'DELETE FROM job_posts WHERE id = ?';
  pool.query(query, [jobId], (err, result) => {
    if (err) {
      console.error('Error deleting job:', err);
      return res.status(500).json({ message: 'Error deleting job' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Job not found or already deleted' });
    }

    res.json({ message: 'Job deleted successfully' });
  });
});

module.exports = router;
