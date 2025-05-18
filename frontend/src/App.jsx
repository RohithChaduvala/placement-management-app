import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import StudentLogin from './pages/StudentLogin';
import OfficerLogin from './pages/OfficerLogin';
import FacultyLogin from './pages/FacultyLogin';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOtp from './pages/VerifyOtp';
import Home from './pages/Home';
import StudentDashboard from './pages/StudentDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import PostJob from './pages/PostJob';
import OfficerPostedJobs from './pages/OfficerPostedJobs';
import FacultyDashboard from './pages/FacultyDashboard';
import ApproveJobPosts from './pages/ApproveJobPosts';
import ViewStudentProfile from './pages/ViewStudentProfile'; // <-- Add this import

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/officer-login" element={<OfficerLogin />} />
            <Route path="/faculty-login" element={<FacultyLogin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} /> {/* <-- Added */}
            <Route path="/view-student-profile" element={<ViewStudentProfile />} />   {/* <-- Added */}
            <Route path="/officer-dashboard" element={<OfficerDashboard />} />
            <Route path="/officer/post-job" element={<PostJob />} />
            <Route path="/officer/view-jobs" element={<OfficerPostedJobs />} />
            <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
            <Route path="/approve-job-posts" element={<ApproveJobPosts />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
};

export default App;
