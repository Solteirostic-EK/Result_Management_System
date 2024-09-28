import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaIdCard ,FaChevronLeft} from 'react-icons/fa'; // Import an icon for PRN
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './CSS/LoginStudent.css'; // Custom CSS for additional styles

const branchCodes = {
  'Computer Engineering': 'CE',
  'Mechanical Engineering': 'ME',
  'Electronics Engineering': 'EE',
  // Add other branches as needed
};

function validatePRN(prn_no) {
  const year = prn_no.substring(0, 4); // Extract year
  const branchCode = prn_no.substring(4, 6); // Extract branch code
  const sequenceNumber = prn_no.substring(6); // Extract sequence number

  const currentYear = new Date().getFullYear();
  if (isNaN(year) || year < 2000 || year > currentYear) {
    return false; // Invalid year
  }

  const validBranchCode = Object.values(branchCodes).includes(branchCode);
  if (!validBranchCode) {
    return false; // Invalid branch code
  }

  if (isNaN(sequenceNumber) || sequenceNumber.length < 3) {
    return false; // Invalid sequence number
  }

  return true; // PRN is valid
}

const LoginStudent = () => {
  const [prnNo, setPrnNo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePRN(prnNo)) {
      toast.success("PRN is valid.");
      
      try {
        const response = await axios.post('/api/student/login', { prn_no: prnNo });
        localStorage.setItem('prn_no', prnNo);
        toast.success('Login successful');
        navigate('/dashboard');
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.error);
        } else {
          toast.error('Server error');
        }
      }
    } else {
      toast.error("PRN is invalid.");
    }

    // Clear the PRN field
    setPrnNo('');
  };

  const handleHomeClick = () => {
    navigate('/student-results');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={styles.container}>
      <div className="card shadow-lg p-4" style={styles.card}>
        <h2 className="text-center mb-4">Student Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group mb-3">
            <label htmlFor="prnNo">PRN No:</label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-white"><FaIdCard /></span>
              <input
                id="prnNo"
                type="text"
                className="form-control"
                value={prnNo}
                onChange={(e) => setPrnNo(e.target.value)}
                placeholder="Enter your PRN"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        <div className="d-grid gap-2 mt-4">
            <button onClick={handleHomeClick} className="btn btn-secondary btn-lg">
              <FaChevronLeft style={styles.icon} /> Back
            </button>
          </div>
      </div>
    </div>
  );
};

// Custom styles for the container and card
const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#f4f7ff', // Light background
  },
  card: {
    borderRadius: '15px',
    maxWidth: '400px',
    width: '100%',
    backgroundColor: '#ffffff',
  },
};

export default LoginStudent;
