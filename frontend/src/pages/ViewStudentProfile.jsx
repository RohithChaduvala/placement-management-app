import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewStudentProfile = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState(null);
  const [editableFields, setEditableFields] = useState({
    phone: '',
    resume_url: '',
    github_url: '',
    linkedin_url: '',
    skills: '',
    portfolio_url: '',
  });

  useEffect(() => {
    let storedEmail = localStorage.getItem('studentEmail');
    const routeEmail = location.state?.email;

    if (routeEmail) {
      storedEmail = routeEmail;
      localStorage.setItem('studentEmail', routeEmail);
    }

    if (storedEmail) {
      setEmail(storedEmail);
      fetchProfile(storedEmail);
    } else {
      toast.error('No email found to load profile.');
    }
  }, [location.state]);

  const fetchProfile = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/student/profile/${email}`);
      if (res.data.success !== false) {
        const student = res.data.profile || res.data; // support both styles
        setProfile(student);
        setEditableFields({
          phone: student.phone || '',
          resume_url: student.resume_url || '',
          github_url: student.github_url || '',
          linkedin_url: student.linkedin_url || '',
          skills: student.skills || '',
          portfolio_url: student.portfolio_url || '',
        });
      } else {
        toast.error('Failed to load profile.');
      }
    } catch (error) {
      toast.error('Server error while fetching profile.');
    }
  };

  const handleChange = (e) => {
    setEditableFields({ ...editableFields, [e.target.name]: e.target.value });
  };

  const calculateProgress = () => {
    const totalFields = Object.keys(editableFields).length;
    const filledFields = Object.values(editableFields).filter((val) => val.trim() !== '').length;
    return Math.floor((filledFields / totalFields) * 100);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/student/update-profile/${email}`, editableFields);
      toast.success(res.data.message || 'Profile updated successfully!');
    } catch (error) {
      toast.error('Update failed');
    }
  };

  if (!profile) return <div className="p-4">Loading profile...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-6 shadow-md bg-white rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>

      {/* Profile Completion Progress */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-1">Profile Completion</label>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <p className="text-right text-sm text-gray-500 mt-1">{calculateProgress()}% completed</p>
      </div>

      {/* Read-only fields */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Field label="Name" value={profile.name} readOnly />
        <Field label="Email" value={profile.email} readOnly />
        <Field label="Roll Number" value={profile.roll_number} readOnly />
        <Field label="Branch" value={profile.branch} readOnly />
        <Field label="Course" value={profile.course} readOnly />
        <Field label="CGPA" value={profile.cgpa} readOnly />
      </div>

      {/* Editable fields */}
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Phone" name="phone" value={editableFields.phone} onChange={handleChange} />
        <InputField label="Resume Link" name="resume_url" value={editableFields.resume_url} onChange={handleChange} />
        <InputField label="GitHub URL" name="github_url" value={editableFields.github_url} onChange={handleChange} />
        <InputField label="LinkedIn URL" name="linkedin_url" value={editableFields.linkedin_url} onChange={handleChange} />
        <InputField label="Portfolio URL" name="portfolio_url" value={editableFields.portfolio_url} onChange={handleChange} />
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-600">Skills</label>
          <textarea
            name="skills"
            value={editableFields.skills}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            placeholder="e.g., Java, React, SQL..."
          />
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleUpdate}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

const Field = ({ label, value, readOnly }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600">{label}</label>
    <input
      type="text"
      value={value}
      readOnly={readOnly}
      className="mt-1 p-2 w-full border border-gray-300 rounded bg-gray-100"
    />
  </div>
);

const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 p-2 w-full border border-gray-300 rounded"
    />
  </div>
);

export default ViewStudentProfile;
