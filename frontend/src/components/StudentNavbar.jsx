// src/components/StudentNavbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const StudentNavbar = ({ name }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-600 text-white flex justify-between items-center px-6 py-4 shadow-lg">
      <h1 className="text-2xl font-bold animate-pulse">Welcome, {name}!</h1>
      <FaUserCircle
        className="text-3xl cursor-pointer"
        onClick={() => navigate("/student/profile")}
      />
    </div>
  );
};

export default StudentNavbar;
