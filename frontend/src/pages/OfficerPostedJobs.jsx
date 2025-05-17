import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OfficerPostedJobs = () => {
  const officer = JSON.parse(localStorage.getItem('officer'));
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/officer/jobs?email=${officer.email}`);
      setJobs(response.data.jobs);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      alert('Failed to fetch jobs.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      await axios.delete(`http://localhost:5000/officer/delete-job/${jobId}`);
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete job.');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.job_title.toLowerCase().includes(search.toLowerCase()) ||
    job.job_location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-700">Jobs You Posted</h2>
          <button
            onClick={() => navigate('/officer-dashboard')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            ← Back to Dashboard
          </button>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by job title or location"
          className="w-full mb-4 p-2 border rounded"
        />

        {loading ? (
          <p>Loading...</p>
        ) : filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Deadline</th>
                  <th className="border px-4 py-2">Package</th>
                  <th className="border px-4 py-2">Location</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id}>
                    <td className="border px-4 py-2">{job.job_title}</td>
                    <td className="border px-4 py-2">{job.job_description}</td>
                    <td className="border px-4 py-2">{new Date(job.application_deadline).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{job.package_offered}</td>
                    <td className="border px-4 py-2">{job.job_location}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfficerPostedJobs;
