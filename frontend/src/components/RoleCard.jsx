import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleCard = ({ role, navigateTo }) => {
  const navigate = useNavigate();

  const getImageSrc = (role) => {
    switch (role.toLowerCase()) {
      case 'student':
        return '/images/student-logo.png';
      case 'faculty':
        return '/images/faculty-logo.png';
      case 'officer':
        return '/images/officer-logo.png';
      default:
        return '/images/default-logo.png'; // Fallback image
    }
  };

  return (
    <div
      onClick={() => navigate(navigateTo)}
      className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <img src={getImageSrc(role)} alt={role} className="w-20 h-20 mb-4" />
      <h2 className="text-xl font-semibold">{role}</h2>
    </div>
  );
};

export default RoleCard;
