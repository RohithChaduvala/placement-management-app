import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state?.email;  // Safe access to email from state
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email) {
      console.log("Email not found, redirecting to login");
      navigate("/student-login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const encodedEmail = encodeURIComponent(email);
        const res = await axios.get(`http://localhost:5000/student/profile/${encodedEmail}`);

        console.log(res.data);  // Log profile data

        if (res.data.success) {
          setProfile(res.data.profile);
        } else {
          setError("Profile not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [email, navigate]);

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!profile) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Student Profile</h2>
        <div className="space-y-4">
          <div className="text-xl">
            <strong className="text-gray-700">Roll Number:</strong> {profile.roll_number}
          </div>
          <div className="text-xl">
            <strong className="text-gray-700">Name:</strong> {profile.name}
          </div>
          <div className="text-xl">
            <strong className="text-gray-700">Section:</strong> {profile.section}
          </div>
          <div className="text-xl">
            <strong className="text-gray-700">Branch:</strong> {profile.branch}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
