import React, { useState, useEffect } from 'react';

import { Link, Routes, Route, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // corrected import of jwtDecode
import { FaSignOutAlt, FaHome, FaClipboardList, FaMoon, FaSun } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './CSS/AdminDashboard.css';

import AttendanceUpload from './AdminComponent/AttendanceUpload';
import ProjectReviewUpload from './AdminComponent/ProjectReviewUpload';
import AssessmentUpload from './AdminComponent/AssessmentUpload';
import ProjectSubmissionUpload from './AdminComponent/ProjectSubmissionUpload';
import LinkedInPostUpload from './AdminComponent/LinkedInPostUpload';

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setAdminName(decodedToken.name);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        navigate('/admin-login');
      }
    } else {
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin-dashboard');
  };

  const handleHome = () => {
    navigate('/');
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  return (
    <div className={`body ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className={`container mt-5 ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 style={{ color: darkMode ? "#f1f1f1" : "#007bff" }}>Welcome, {adminName}</h1>
          <div className="action-buttons">
            <button className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-primary'} me-2`} onClick={handleHome}>
              <FaHome /> Home
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
            <button className={`btn ${darkMode ? 'btn-light' : 'btn-secondary'} ms-2`} onClick={toggleDarkMode}>
              {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>

        <Navbar darkMode={darkMode} location={location} />

        <Routes>
          <Route path="attendance" element={<AttendanceUpload />} />
          <Route path="project-review" element={<ProjectReviewUpload />} />
          <Route path="assessment" element={<AssessmentUpload />} />
          <Route path="project-submission" element={<ProjectSubmissionUpload />} />
          <Route path="linkedin" element={<LinkedInPostUpload />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

const Navbar = ({ darkMode, location }) => (
  <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} mb-4 shadow`}>
    <div className="container-fluid">
      <button
        className="navbar-toggler custom-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <NavItem path="attendance" icon={<FaClipboardList />} label="Attendance Marks" location={location} />
          <NavItem path="project-review" icon={<FaClipboardList />} label="Project Review Marks" location={location} />
          <NavItem path="assessment" icon={<FaClipboardList />} label="Assessment Marks" location={location} />
          <NavItem path="project-submission" icon={<FaClipboardList />} label="Project Submission Marks" location={location} />
          <NavItem path="linkedin" icon={<FaClipboardList />} label="LinkedIn Post Marks" location={location} />
        </ul>
      </div>
    </div>
  </nav>
);

const NavItem = ({ path, icon, label, location }) => (
  <li className="nav-item">
    <Link className={`nav-link ${location.pathname === `/${path}` ? 'active' : ''}`} to={path}>
      {icon} {label}
    </Link>
  </li>
);

export default AdminDashboard;
