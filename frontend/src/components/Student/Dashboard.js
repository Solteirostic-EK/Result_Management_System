import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { FaBook, FaClipboardList, FaProjectDiagram, FaPenFancy, FaLinkedin } from 'react-icons/fa';
import './CSS/Loader.css';
import './CSS/Dashboard.css';
import AttendanceMarks from './Route/AttendanceMarks';
import ProjectReviewMarks from './Route/ProjectReviewMarks';
import AssessmentMarks from './Route/AssessmentMarks';
import ProjectSubmissionMarks from './Route/ProjectSubmissionMarks';
import LinkedInPostMarks from './Route/LinkedInPostMarks';
import StudentInfo from './StudentInfo'; // Ensure this file name is consistent

const Loader = () => (
  <div className="loader-container">
    <div className="spinner"></div>
  </div>
);

const Dashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const prnNo = localStorage.getItem('prn_no');

    if (!prnNo) {
      toast.error('You must be logged in!');
      navigate('/'); // Redirect to login page if PRN is not found
      return;
    }

    const fetchStudentData = async () => {
      try {
        const response = await axios.post(`/api/student/detail/${prnNo}`);
        setStudentData(response.data.student);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [navigate]);

  const handleError = (error) => {
    if (error.response) {
      if (error.response.status === 404) {
        toast.error('Student not found.');
      } else if (error.response.status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error(`Error: ${error.response.data.message || 'Unknown error occurred.'}`);
      }
    } else if (error.request) {
      toast.error('No response received. Please check your connection.');
    } else {
      toast.error('Error setting up the request: ' + error.message);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!studentData) {
    return <div>No student data available</div>;
  }

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-light p-4" style={sidebarStyle}>
        <StudentInfo studentData={studentData} /> {/* Updated prop */}
      </div>
      <div className="flex-grow-1 p-4" style={dashboardStyle}>
        <h1 style={headerStyle}>Welcome, {studentData.name}</h1>
        <nav>
          <ul style={navStyle}>
            <li className="nav-item" key="attendance-marks">
              <Link to="attendance-marks" className="link">
                <FaClipboardList style={iconStyle} /> Attendance Marks
              </Link>
            </li>
            <li className="nav-item" key="project-review-marks">
              <Link to="project-review-marks" className="link">
                <FaProjectDiagram style={iconStyle} /> Project Review Marks
              </Link>
            </li>
            <li className="nav-item" key="assessment-marks">
              <Link to="assessment-marks" className="link">
                <FaBook style={iconStyle} /> Assessment Marks
              </Link>
            </li>
            <li className="nav-item" key="project-submission-marks">
              <Link to="project-submission-marks" className="link">
                <FaPenFancy style={iconStyle} /> Project Submission Marks
              </Link>
            </li>
            <li className="nav-item" key="linkedin-post-marks">
              <Link to="linkedin-post-marks" className="link">
                <FaLinkedin style={iconStyle} /> LinkedIn Post Marks
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="attendance-marks" element={<AttendanceMarks studentData={studentData} />} />
          <Route path="project-review-marks" element={<ProjectReviewMarks studentData={studentData} />} />
          <Route path="assessment-marks" element={<AssessmentMarks studentData={studentData} />} />
          <Route path="project-submission-marks" element={<ProjectSubmissionMarks studentData={studentData} />} />
          <Route path="linkedin-post-marks" element={<LinkedInPostMarks studentData={studentData} />} />
        </Routes>
      </div>
    </div>
  );
};

const dashboardStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f0f4f8',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const headerStyle = {
  color: '#007bff',
  textAlign: 'center',
  marginBottom: '20px',
};

const navStyle = {
  listStyleType: 'none',
  padding: 0,
  display: 'flex',
  justifyContent: 'space-around',
  marginBottom: '20px',
};

const iconStyle = {
  marginRight: '8px',
  color: '#007bff',
};

const sidebarStyle = {
  width: '330px',
  backgroundColor: '#f8f9fa',
  height: '100%',
};

export default Dashboard;
