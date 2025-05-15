import React, { useState } from 'react';
import axios from 'axios';

const PostJob = () => {
  const [formData, setFormData] = useState({
    job_title: '',
    job_description: '',
    required_skills: '',
    eligible_branches: '',
    eligible_courses: '',
    min_cgpa: '',
    application_deadline: '',
    job_location: '',
    package_offered: '',
  });

  const officer = JSON.parse(localStorage.getItem('officer'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/officer/jobs', {
        email: officer.email,
        ...formData,
        registration_form: [],
      });

      alert('Job posted successfully!');
    } catch (err) {
      if (err.response) {
        console.error('Server responded with error:', err.response.data);
        alert(`Failed to post job:\n${JSON.stringify(err.response.data, null, 2)}`);
      } else if (err.request) {
        console.error('No response from server:', err.request);
        alert('No response from server. Please check if the backend is running.');
      } else {
        console.error('Error', err.message);
        alert(`Error: ${err.message}`);
      }
    }
  };

  const getExample = (field) => {
    switch (field) {
      case 'required_skills':
        return 'Example: Java, Python, React';
      case 'eligible_branches':
        return 'Example: CSE, ECE, ME';
      case 'eligible_courses':
        return 'Example: B.Tech, M.Tech';
      case 'application_deadline':
        return 'Format: YYYY-MM-DD';
      case 'min_cgpa':
        return 'Example: 6.5';
      case 'package_offered':
        return 'Example: 6 LPA';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Post New Job</h2>

        {Object.keys(formData).map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-sm font-semibold mb-1 capitalize">
              {field.replace(/_/g, ' ')}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
            {getExample(field) && (
              <p className="text-xs text-gray-500 mt-1">{getExample(field)}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostJob;
