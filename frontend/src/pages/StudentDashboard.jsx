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
    if (!email) {
      navigate('/student-login');
      return;
    }

    const fetchProfileAndJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/student/profile/${encodeURIComponent(email)}`);
        const student = res.data.profile;
        setProfile(student);

        if (
          student.profile_status?.toLowerCase() === 'approved' &&
          Number(student.is_access_revoked) === 0
        ) {
          const jobRes = await axios.get(`http://localhost:5000/student/all-approved-jobs`);
          setJobs(jobRes.data.jobs);
        } else {
          setJobs([]); // Profile not approved or access revoked
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
          onClick={() => {
            localStorage.setItem('studentEmail', email);
            navigate('/view-student-profile', { state: { email } });
          }}
        >
          👤
        </button>
      </div>

      <h3 className="text-xl font-medium mb-2">All Approved Jobs</h3>
      {jobs.length === 0 ? (
        <p>No approved jobs available at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => {
            const eligibleBranches = job.eligible_branches
              ?.split(',')
              .map(b => b.trim().toLowerCase()) || [];

            const eligibleCourses = job.eligible_courses
              ?.split(',')
              .map(c => c.trim().toLowerCase()) || [];

            const isEligible =
              parseFloat(profile.cgpa) >= parseFloat(job.min_cgpa) &&
              eligibleBranches.includes(profile.branch.toLowerCase()) &&
              eligibleCourses.includes(profile.course.toLowerCase());

            return (
              <li key={job.id} className="border p-4 rounded shadow">
                <h4 className="text-lg font-bold">{job.job_title}</h4>
                <p className="text-sm text-gray-700">{job.job_description}</p>

                <div className="text-sm text-gray-600 mt-2 space-y-1">
                  <p><strong>Type:</strong> {job.job_type}</p>
                  <p><strong>Location:</strong> {job.job_location}</p>
                  <p><strong>Package:</strong> {job.package_offered}</p>
                  <p><strong>Deadline:</strong> {new Date(job.application_deadline).toLocaleDateString()}</p>
                  <p><strong>Min CGPA Required:</strong> {job.min_cgpa}</p>
                  <p><strong>Eligible Branches:</strong> {job.eligible_branches}</p>
                  <p><strong>Eligible Courses:</strong> {job.eligible_courses}</p>
                </div>

                {isEligible ? (
                  <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Apply Now
                  </button>
                ) : (
                  <div className="text-red-500 text-sm text-right mt-2">
                    You are not eligible for this job
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default StudentDashboard;
