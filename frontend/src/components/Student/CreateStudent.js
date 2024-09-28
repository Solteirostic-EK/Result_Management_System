import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaChevronLeft } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentCreation = () => {
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [joiningYear] = useState(new Date().getFullYear());
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactPattern = /^\d{10}$/;

    if (!name.trim()) {
      toast.error('Name is required.');
      return false;
    }
    if (!email || !emailPattern.test(email)) {
      toast.error('Invalid email format.');
      return false;
    }
    if (!contactNumber || !contactPattern.test(contactNumber)) {
      toast.error('Contact number must be 10 digits.');
      return false;
    }
    if (!dateOfBirth) {
      toast.error('Date of Birth is required.');
      return false;
    }
    if (!address.trim()) {
      toast.error('Address is required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const studentData = {
      name,
      branch,
      joining_year: parseInt(joiningYear),
      email,
      contactNumber,
      dateOfBirth,
      address,
    };

    setLoading(true);
    try {
      const response = await axios.post('/api/student/create', studentData);
      toast.success('Student added successfully! Email sent.');
      console.log('New Student:', response.data.student);

      setName('');
      setBranch('');
      setEmail('');
      setContactNumber('');
      setDateOfBirth('');
      setAddress('');

      navigate('/login-student');
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error('Error adding student: ' + error.response.data.error);
      } else {
        toast.error('Server error. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleHomeClick = () => {
    navigate('/student-results');
  };


  return (
    <div className="container d-flex justify-content-center align-items-center" style={styles.container}>
      <div className="card shadow-lg" style={styles.card}>
        <div className="card-body">
          <h2 className="text-center mb-4">
            <FaUserPlus style={styles.icon} /> Create Student
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Branch:</label>
                <select
                  className="form-select"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  required
                >
                  <option value="">Select Branch</option>
                  <option value="Computer Engineering">Computer Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Electronics Engineering">Electronics Engineering</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Joining Year:</label>
                <input
                  type="text"
                  className="form-control"
                  value={joiningYear}
                  readOnly
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Contact Number:</label>
                <input
                  type="text"
                  className="form-control"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Date of Birth:</label>
                <input
                  type="date"
                  className="form-control"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="form-label">Address:</label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Adding...' : 'Add Student'}
            </button>
          </form>

          <div className="d-grid gap-2 mt-4">
            <button onClick={handleHomeClick} className="btn btn-secondary btn-lg">
              <FaChevronLeft style={styles.icon} /> Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom styles for the container and card
const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#f4f7ff',
  },
  card: {
    padding: '40px',
    borderRadius: '15px',
    backgroundColor: '#ffffff',
    width: '700px', // Increased width for 2-column layout
  },
  icon: {
    marginRight: '10px',
    fontSize: '24px',
    color: '#007bff',
  },
};

export default StudentCreation;
