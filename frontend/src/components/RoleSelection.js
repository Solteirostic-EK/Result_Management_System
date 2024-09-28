import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FaUserShield, FaUserGraduate } from 'react-icons/fa'; // Import icons for Admin and Student

const RoleSelection = () => {
  const navigate = useNavigate();

  // Handle Admin Navigation
  const handleAdminClick = () => {
    navigate('/admin-dashboard'); // Redirect to Admin dashboard
  };

  // Handle Student Navigation
  const handleStudentClick = () => {
    navigate('/student-results'); // Redirect to Student result search page
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={styles.container}>
      <div className="card text-center shadow-lg" style={styles.card}>
        <h1 className="mb-4" style={styles.title}>Result Management System</h1>
        <p style={styles.description}>Choose your role to continue</p>
        <div className="d-grid gap-3">
          <button
            onClick={handleAdminClick}
            className="btn btn-lg"
            style={styles.adminButton}
          >
            <FaUserShield style={styles.icon} /> Admin Dashboard
          </button>
          <button
            onClick={handleStudentClick}
            className="btn btn-lg"
            style={styles.studentButton}
          >
            <FaUserGraduate style={styles.icon} /> View Student Results
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced container and card design
const styles = {
  container: {
    height: '100vh',
    backgroundImage: 'linear-gradient(135deg, #f4f7ff 0%, #d6e0f0 100%)', // Subtle gradient
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px', // Ensures padding on mobile devices
  },
  card: {
    padding: '40px',
    maxWidth: '450px', // Slightly wider for better readability
    borderRadius: '25px', // More rounded corners for modern look
    border: 'none',
    backgroundColor: '#ffffff',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)', // Deeper shadow for prominent card
    transition: 'transform 0.3s ease',
  },
  title: {
    color: '#343a40',
    fontWeight: 'bold',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '28px',
  },
  description: {
    color: '#6c757d',
    marginBottom: '20px',
    fontSize: '16px',
    fontFamily: 'Roboto, sans-serif',
  },
  adminButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 25px',
    fontSize: '18px',
    width: '100%',
    transition: 'background-color 0.3s ease, transform 0.2s',
  },
  studentButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 25px',
    fontSize: '18px',
    width: '100%',
    transition: 'background-color 0.3s ease, transform 0.2s',
  },
  icon: {
    marginRight: '10px',
    fontSize: '20px',
    verticalAlign: 'middle',
  },
};

// Add hover effects dynamically
const buttonHoverEffect = `
  .btn:hover {
    transform: scale(1.05);
    background-color: #0056b3 !important;
  }

  .btn:active {
    transform: scale(0.98);
  }

  .btn-admin:hover {
    background-color: #0056b3 !important;
  }

  .btn-student:hover {
    background-color: #218838 !important;
  }
`;

// Inject the hover effect styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = buttonHoverEffect;
document.head.appendChild(styleSheet);

export default RoleSelection;
