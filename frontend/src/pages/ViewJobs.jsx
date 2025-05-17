import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OfficerNav from './OfficerNav';

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const officer = JSON.parse(localStorage.getItem('officer'));

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/officer/jobs', {
          params: { email: officer.email },
        });
        setJobs(res.data.jobs);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };

    fetchJobs();
  }, [officer.email]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <OfficerNav />
      <div className="max-w-5xl mx-auto bg-white shadow p-4 rounded">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Jobs Posted by You</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Skills</th>
              <th className="p-2 border">Deadline</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Package</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="text-center">
                <td className="p-2 border">{job.job_title}</td>
                <td className="p-2 border">{job.required_skills}</td>
                <td className="p-2 border">{job.application_deadline}</td>
                <td className="p-2 border">{job.job_location}</td>
                <td className="p-2 border">{job.package_offered}</td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-600">
                  No jobs posted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewJobs;
