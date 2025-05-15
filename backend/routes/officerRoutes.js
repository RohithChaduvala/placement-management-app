const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

// Officer posts a new job
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

    // Step 1: Find officer_id using email
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

      // Step 2: Insert job post into job_posts
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


module.exports = router;
