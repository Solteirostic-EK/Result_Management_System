import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft, FaHome } from 'react-icons/fa'; // Importing back arrow icon

const StudentInfo = ({ studentData }) => {
  const navigate = useNavigate(); // React Router's navigate hook

  const handleBackClick = () => {
    navigate('/login-student'); // Navigate to the login page
  };

  const handleHomeClick = () => {
    navigate('/'); // Navigate to the login page
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg">
        <div className="card-body">
          <h4 className="card-title text-center mb-4">Student Information</h4>
          <div className="row mb-3">
            <div className="col-4 font-weight-bold">PRN No:</div>
            <div className="col-8">{studentData.prn_no}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4 font-weight-bold">Name:</div>
            <div className="col-8">{studentData.name}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4 font-weight-bold">Email:</div>
            <div className="col-8">{studentData.email}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4 font-weight-bold">Branch:</div>
            <div className="col-8">{studentData.branch}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4 font-weight-bold">Joining Year:</div>
            <div className="col-8">{studentData.joining_year}</div>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={handleBackClick}>
              <FaArrowLeft /> Back to Login
            </button>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={handleHomeClick}>
              <FaHome /> Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
