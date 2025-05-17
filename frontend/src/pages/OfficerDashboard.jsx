import React from 'react';
import { useNavigate } from 'react-router-dom';

const OfficerDashboard = () => {
  const navigate = useNavigate();
  const officer = JSON.parse(localStorage.getItem('officer'));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4 text-blue-700">Welcome, {officer?.name} 👋</h1>

          <p className="text-gray-600 mb-4">
            Email: <span className="font-medium">{officer?.email}</span>
          </p>
          <p className="text-gray-600 mb-6">
            Company: <span className="font-medium">{officer?.company_name}</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/officer/post-job')}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow"
            >
              Post New Job
            </button>
            <button
  onClick={() => navigate('/officer/view-jobs')}
  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow"
>
  View Posted Jobs
</button>

            <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg shadow">
              Filter Students
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow">
              Export to CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerDashboard;
