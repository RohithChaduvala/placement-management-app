import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OfficerNav from './OfficerNav';

const initialFormState = {
  job_title: '',
  job_description: '',
  required_skills: '',
  eligible_branches: [],
  eligible_courses: '',
  min_cgpa: '',
  application_deadline: '',
  job_location: '',
  package_offered: '',
  job_type: '',
};

const courseOptions = ['B.Tech', 'M.Tech'];
const branchOptions = ['CSE', 'IT', 'ECE', 'ME', 'EEE', 'CE'];
const jobTypeOptions = ['Full-time', 'Internship', 'Part-time'];

const PostJob = () => {
  const [formData, setFormData] = useState(initialFormState);
  const officer = JSON.parse(localStorage.getItem('officer'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBranchChange = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData((prev) => ({ ...prev, eligible_branches: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/officer/jobs', {
        email: officer.email,
        ...formData,
        eligible_branches: formData.eligible_branches.join(', '), // format for backend
        registration_form: [],
      });

      toast.success('Job posted successfully!');
      setFormData(initialFormState);
    } catch (err) {
      console.error(err);
      toast.error('Failed to post job. Check server or input fields.');
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

        {/* Text inputs */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Job Title</label>
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Job Description</label>
          <textarea
            name="job_description"
            value={formData.job_description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Required Skills</label>
          <input
            type="text"
            name="required_skills"
            value={formData.required_skills}
            onChange={handleChange}
            placeholder="Example: Java, Python, React"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* Dropdowns */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Eligible Courses</label>
          <select
            name="eligible_courses"
            value={formData.eligible_courses}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Course</option>
            {courseOptions.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Eligible Branches (Ctrl+Click to select multiple)
          </label>
          <select
            name="eligible_branches"
            multiple
            value={formData.eligible_branches}
            onChange={handleBranchChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            {branchOptions.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Hold Ctrl (Windows) or Command (Mac) to select multiple branches.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Job Type</label>
          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Type</option>
            {jobTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Remaining Inputs */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Minimum CGPA</label>
          <input
            type="number"
            name="min_cgpa"
            value={formData.min_cgpa}
            onChange={handleChange}
            placeholder="Example: 6.5"
            className="w-full px-3 py-2 border rounded"
            step="0.1"
            min="0"
            max="10"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Application Deadline
          </label>
          <input
            type="date"
            name="application_deadline"
            value={formData.application_deadline}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Job Location</label>
          <input
            type="text"
            name="job_location"
            value={formData.job_location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1">Package Offered</label>
          <input
            type="text"
            name="package_offered"
            value={formData.package_offered}
            onChange={handleChange}
            placeholder="Example: 6 LPA"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

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
