import React from 'react';
import RoleCard from '../components/RoleCard'; // Import the RoleCard component
import { useNavigate } from 'react-router-dom';

const SelectRole = () => {
  const navigate = useNavigate();

  const roles = [
    { name: 'Student', link: '/student-login' },
    { name: 'Faculty', link: '/faculty-login' },
    { name: 'Officer', link: '/placement-login' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {roles.map((role) => (
          <RoleCard key={role.name} role={role.name} navigateTo={role.link} />
        ))}
      </div>
    </div>
  );
};

export default SelectRole;
