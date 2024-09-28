import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaUser, FaLock, FaEnvelope, FaHome } from 'react-icons/fa'; // Import FaHome for Home icon
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const CreateAdminForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Added email state
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Track form submission state

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading

    try {
      // Make API request to create admin with username, email, and password
      const response = await axios.post('/api/admin/create', { username, email, password });

      // If successful, show success message and reset form
      if (response.status === 201) {
        toast.success('Admin created successfully!');
        localStorage.setItem('token', response.data.token);
        setUsername('');
        setEmail(''); // Reset email field
        setPassword('');

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/admin-login');
        }, 3000);
      }

    } catch (err) {
      // Handle error response from the server
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response && err.response.status === 500) {
        toast.error('Internal server error. Please try again later.');
      } else {
        toast.error('An unknown error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Navigate back to Home page
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={styles.container}>
      <div className="card shadow-lg" style={styles.card}>
        <h2 className="text-center mb-4" style={styles.title}>Create Admin Account</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-white"><FaUser /></span>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-white"><FaEnvelope /></span>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-white"><FaLock /></span>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? 'Creating...' : 'Create Admin'}
            </button>
          </div>
        </form>

        {/* Redirect to Login */}
        <div className="text-center mt-3">
          <p>Already have an account? <a onClick={() => navigate('/admin-login')} className="text-decoration-none">Login here</a></p>
        </div>

        {/* Home Button */}
        <div className="d-grid gap-2 mt-4">
          <button onClick={handleHomeClick} className="btn btn-secondary btn-lg">
            <FaHome style={styles.icon} /> Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

// Styling for container, form, and card
const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f7ff',
  },
  card: {
    padding: '40px',
    borderRadius: '15px',
    maxWidth: '450px',
    width: '100%',
    backgroundColor: '#fff',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#343a40',
    fontWeight: 'bold',
    fontFamily: 'Roboto, sans-serif',
  },
  icon: {
    marginRight: '10px',
    fontSize: '20px',
  },
};

// Add hover effects and button animations
const buttonHoverEffect = `
  .btn:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
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

export default CreateAdminForm;
