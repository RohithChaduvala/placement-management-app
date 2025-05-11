import React, { useState } from 'react';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle OTP verification and password update logic here
    console.log('OTP Verified', { otp, newPassword });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Verify OTP & Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-semibold text-gray-700">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
