import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt, FaHome } from 'react-icons/fa'; // Import the FaHome icon for the Home button
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AdminSelection = () => {
  const navigate = useNavigate();

  // Navigate to Create Admin page
  const handleCreateAdminClick = () => {
    navigate('/create-admin'); // Redirect to Create Admin page
  };

  // Navigate to Admin Login page
  const handleLoginAdminClick = () => {
    navigate('/admin-login'); // Redirect to Admin login page
  };

  // Navigate to Home page
  const handleHomeClick = () => {
    navigate('/'); // Redirect to Home page
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={styles.container}>
      <div className="card text-center shadow-lg" style={styles.card}>
        <h1 className="mb-4" style={styles.title}>Result Management Admin</h1>
        <p style={styles.description}>Select an option below to Create or Login Admin account:</p>
        <div className="d-grid gap-3">
          <button
            onClick={handleCreateAdminClick}
            className="btn btn-primary btn-lg"
            style={styles.button}
          >
            <FaUserPlus style={styles.icon} /> Create Admin
          </button>
          <button
            onClick={handleLoginAdminClick}
            className="btn btn-success btn-lg"
            style={styles.button}
          >
            <FaSignInAlt style={styles.icon} /> Admin Login
          </button>
          {/* Add the Home button at the bottom */}
          <button
            onClick={handleHomeClick}
            className="btn btn-secondary btn-lg"
            style={styles.button}
          >
            <FaHome style={styles.icon} /> Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

// Styling for container, buttons, and card layout
const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#f4f7ff', // Light background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: '40px',
    maxWidth: '450px', // Wider card for better layout
    borderRadius: '20px',
    border: 'none',
    background: 'linear-gradient(145deg, #ffffff, #e6e9f3)', // Subtle gradient for card
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)', // Enhanced shadow
  },
  title: {
    color: '#343a40',
    fontWeight: 'bold',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '28px', // Larger title font
  },
  description: {
    color: '#6c757d',
    fontSize: '16px',
    marginBottom: '20px',
    fontFamily: 'Roboto, sans-serif',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50px',
    padding: '12px 25px', // Padding adjustments for button
    fontSize: '18px',
    transition: 'all 0.3s ease',
    width: '100%',
  },
  icon: {
    marginRight: '10px',
    fontSize: '20px',
  },
};

// Add hover effects via custom CSS
const buttonHoverEffect = `
  .btn:hover {
    transform: scale(1.05);
  }
  .btn:active {
    transform: scale(0.98);
  }
`;

// Inject the hover effect styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = buttonHoverEffect;
document.head.appendChild(styleSheet);

export default AdminSelection;
