import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const email = localStorage.getItem('email');

  useEffect(() => {
    if (!email) return navigate('/student-login');

    const fetchProfileAndJobs = async () => {
      try {
        // Step 1: Fetch student profile
        const res = await axios.get(`http://localhost:5000/student/profile/${encodeURIComponent(email)}`);
        const student = res.data.profile;
        setProfile(student);

        // Step 2: Only fetch jobs if profile is approved
        if (student.profile_status === 'Approved' && student.is_access_revoked === 0) {
          const jobRes = await axios.get(`http://localhost:5000/student/eligible-jobs/${encodeURIComponent(student.roll_number)}`);
          setJobs(jobRes.data.jobs);
        } else {
          setJobs([]);
        }
      } catch (err) {
        console.error('Error fetching profile or jobs', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndJobs();
  }, [email, navigate]);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Welcome, {profile?.name}</h2>
        <button
          className="bg-gray-200 rounded-full w-10 h-10 text-center text-xl"
          onClick={() => navigate('/view-student-profile', { state: { email } })}
        >
          👤
        </button>
      </div>

      <h3 className="text-xl font-medium mb-2">Eligible Jobs</h3>
      {jobs.length === 0 ? (
        <p>No eligible jobs at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job.id} className="border p-4 rounded shadow">
              <h4 className="text-lg font-bold">{job.job_title}</h4>
              <p className="text-sm text-gray-700">{job.job_description}</p>
              <p><strong>Location:</strong> {job.job_location}</p>
              <p><strong>Package:</strong> {job.package_offered}</p>
              <p><strong>Deadline:</strong> {job.application_deadline}</p>

              {job.min_cgpa > profile.cgpa ? (
                <div className="text-red-500 text-sm text-right mt-2">Not eligible</div>
              ) : (
                <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded">Apply Now</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentDashboard;
