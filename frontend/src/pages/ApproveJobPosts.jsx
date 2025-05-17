import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ApproveJobPosts = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/faculty/unapproved-jobs");
      setJobs(res.data.jobs);
    } catch (err) {
      console.error("Error fetching jobs", err);
      alert("Failed to fetch job posts");
    } finally {
      setLoading(false);
    }
  };

  const approveJob = async (id) => {
    try {
      await axios.post(`http://localhost:5000/faculty/approve-job/${id}`);
      setJobs((prev) => prev.filter((job) => job.id !== id));
      alert("Job approved successfully.");
      setSelectedJob(null); // close modal after approval
    } catch (err) {
      console.error("Approval failed", err);
      alert("Could not approve job.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const parseFields = (jsonStr) => {
    try {
      const parsed = JSON.parse(jsonStr);
      return Array.isArray(parsed.fields) ? parsed.fields : [];
    } catch (err) {
      return [];
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Pending Job Posts</h2>
        <button onClick={() => navigate("/faculty-dashboard")} className="mb-4 bg-gray-200 px-3 py-1 rounded">
          ← Back to Dashboard
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : jobs.length === 0 ? (
          <p>No pending job posts.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Location</th>
                  <th className="border px-4 py-2">Package</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td className="border px-4 py-2">{job.job_title}</td>
                    <td className="border px-4 py-2">{job.job_location}</td>
                    <td className="border px-4 py-2">{job.package_offered}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
            <h3 className="text-xl font-bold mb-4">Job Details</h3>
            <div className="space-y-2 max-h-[70vh] overflow-y-auto">
              <p><strong>Title:</strong> {selectedJob.job_title}</p>
              <p><strong>Description:</strong> {selectedJob.job_description}</p>
              <p><strong>Required Skills:</strong> {selectedJob.required_skills}</p>
              <p><strong>Eligible Branches:</strong> {selectedJob.eligible_branches}</p>
              <p><strong>Eligible Courses:</strong> {selectedJob.eligible_courses}</p>
              <p><strong>Minimum CGPA:</strong> {selectedJob.min_cgpa}</p>
              <p><strong>Application Deadline:</strong> {selectedJob.application_deadline}</p>
              <p><strong>Job Location:</strong> {selectedJob.job_location}</p>
              <p><strong>Package Offered:</strong> {selectedJob.package_offered}</p>
              <p><strong>Registration Form Fields:</strong></p>
              <ul className="list-disc list-inside ml-4">
                {parseFields(selectedJob.registration_form).length > 0 ? (
                  parseFields(selectedJob.registration_form).map((field, index) => (
                    <li key={index}>{field}</li>
                  ))
                ) : (
                  <li>No extra fields</li>
                )}
              </ul>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => approveJob(selectedJob.id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => setSelectedJob(null)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApproveJobPosts;
