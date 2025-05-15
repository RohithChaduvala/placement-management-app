const axios = require('axios');

const BASE_URL = 'http://localhost:5000'; // Adjust if your backend server runs on different port

async function testOfficerLogin() {
  try {
    const response = await axios.post(`${BASE_URL}/officer/login`, {
      email: 'officer1@example.com',
      password: 'officer123',
    });

    console.log('Login response:', response.data);
    
    // If login successful, you might want to test posting a job next
    if (response.data.token) {
      await testPostJob(response.data.token);
    }
  } catch (error) {
    if (error.response) {
      console.error('Login error response:', error.response.data);
    } else {
      console.error('Login error:', error.message);
    }
  }
}

async function testPostJob(token) {
  try {
    const jobData = {
      email: 'officer1@example.com',
      job_title: 'Junior Developer',
      job_description: 'Entry level developer role',
      required_skills: 'JavaScript, Node.js',
      eligible_branches: 'CSE, IT',
      eligible_courses: 'B.Tech',
      min_cgpa: 7.0,
      application_deadline: '2025-07-31',
      job_location: 'Hyderabad',
      package_offered: '8 LPA',
      registration_form: { fields: ['resume', 'cover_letter'] }
    };

    const response = await axios.post(`${BASE_URL}/officer/jobs`, jobData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Job post response:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Job post error response:', error.response.data);
    } else {
      console.error('Job post error:', error.message);
    }
  }
}

testOfficerLogin();
