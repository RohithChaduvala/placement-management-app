import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="w-full max-w-6xl px-5 py-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center drop-shadow-lg">
          Welcome to Placement Management
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Student Card */}
          <Link
            to="/student-login"
            className="bg-white bg-opacity-80 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 flex flex-col items-center p-6"
          >
            <img
              src="/images/student-logo.png"
              alt="Student"
              className="w-32 h-32 mb-4 object-contain"
            />
            <h2 className="text-xl font-semibold text-gray-800">Student Login</h2>
          </Link>

          {/* Officer Card */}
          <Link
            to="/officer-login"
            className="bg-white bg-opacity-80 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 flex flex-col items-center p-6"
          >
            <img
              src="/images/officer-logo.png"
              alt="Officer"
              className="w-32 h-32 mb-4 object-contain"
            />
            <h2 className="text-xl font-semibold text-gray-800">Officer Login</h2>
          </Link>

          {/* Faculty Card */}
          <Link
            to="/faculty-login"
            className="bg-white bg-opacity-80 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300 flex flex-col items-center p-6"
          >
            <img
              src="/images/faculty-logo.png"
              alt="Faculty"
              className="w-32 h-32 mb-4 object-contain"
            />
            <h2 className="text-xl font-semibold text-gray-800">Faculty Login</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
