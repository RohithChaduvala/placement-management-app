import React from 'react';
import { useNavigate } from 'react-router-dom';

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const faculty = JSON.parse(localStorage.getItem("faculty"));

  const handleLogout = () => {
    localStorage.removeItem("faculty");
    navigate("/faculty-login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          Welcome, {faculty?.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <button
            onClick={() => navigate("/approve-job-posts")}
            className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600"
          >
            Approve Job Posts
          </button>

          <button
            onClick={() => navigate("/review-student-profiles")}
            className="bg-green-500 text-white p-4 rounded hover:bg-green-600"
          >
            Review Student Profiles
          </button>

          <button
            onClick={() => navigate("/manage-access")}
            className="bg-yellow-500 text-white p-4 rounded hover:bg-yellow-600"
          >
            Revoke Access
          </button>

          <button
            onClick={() => navigate("/update-placement-stats")}
            className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600"
          >
            Update Placement Stats
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default FacultyDashboard;
