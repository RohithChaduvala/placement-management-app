import React from 'react';
import { useNavigate } from 'react-router-dom';

const OfficerNav = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 mb-6 justify-center">
      <button
        onClick={() => navigate('/officer/post-job')}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Post Job
      </button>
      <button
        onClick={() => navigate('/officer/view-jobs')}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        View Jobs
      </button>
    </div>
  );
};

export default OfficerNav;
