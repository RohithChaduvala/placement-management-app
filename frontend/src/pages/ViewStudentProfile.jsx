// src/pages/ViewStudentProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ViewStudentProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email || localStorage.getItem("email");

  const [profile, setProfile] = useState(null);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!email) return navigate("/student-login");

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/student/profile/${encodeURIComponent(email)}`);
        if (res.data.success) {
          setProfile(res.data.profile);
          setPhone(res.data.profile.phone || "");
        }
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };

    fetchProfile();
  }, [email, navigate]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/student/update-profile`, {
        email,
        phone,
      });
      alert("Profile updated!");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (!profile) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <div className="space-y-4">
        <p><strong>Roll Number:</strong> {profile.roll_number}</p>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Branch:</strong> {profile.branch}</p>
        <p><strong>Course:</strong> {profile.course}</p>

        <div>
          <label className="block font-semibold">Phone:</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleUpdate}
          >
            Save Changes
          </button>
          <button
            className="bg-gray-400 px-4 py-2 rounded"
            onClick={() => navigate("/student-dashboard")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentProfile;
