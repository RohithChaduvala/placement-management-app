import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OfficerNav from './OfficerNav';

const initialFormState = {
  job_title: '',
  job_description: '',
  required_skills: '',
  eligible_branches: '',
  eligible_courses: '',
  min_cgpa: '',
  application_deadline: '',
  job_location: '',
  package_offered: '',
};

const PostJob = () => {
  const [formData, setFormData] = useState(initialFormState);
  const officer = JSON.parse(localStorage.getItem('officer'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/officer/jobs', {
        email: officer.email,
        ...formData,
        registration_form: [],
      });

      toast.success('Job posted successfully!');
      setFormData(initialFormState); // reset form
    } catch (err) {
      console.error(err);
      toast.error('Failed to post job. Check server or input fields.');
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
    <div className="min-h-screen bg-gray-100 p-6">
      <OfficerNav />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl mx-auto"
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
