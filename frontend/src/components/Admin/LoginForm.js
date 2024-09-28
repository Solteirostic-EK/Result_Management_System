import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaUser, FaLock, FaEye, FaEyeSlash,  FaHome } from 'react-icons/fa'; // Import icons for username and password
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for feedback
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate(); // React Router's navigate hook

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin'); // Redirect to admin dashboard if token exists
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts

    try {
      const response = await axios.post('/api/admin/login', { username, password });

      if (response.status === 200) {
        // Successfully logged in, store the token
        localStorage.setItem('token', response.data.token);

        // Clear form and show success toast
        setUsername('');
        setPassword('');
        toast.success(response.data.message);

        // Redirect after a short delay
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      }
    } catch (err) {
      // Handle various error statuses
      const errorMsg = err.response?.data?.message || 'An unknown error occurred';

      // Show toast message based on error response
      toast.error(errorMsg);
    } finally {
      setLoading(false); // Stop loading once request completes
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={styles.container}>
      <div className="card shadow-lg" style={styles.card}>
        <h2 className="text-center mb-4" style={styles.title}>Admin Login</h2>
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
                disabled={loading} // Disable input when loading
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-primary text-white"><FaLock /></span>
              <input
                type={showPassword ? 'text' : 'password'} // Toggle input type
                id="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading} // Disable input when loading
              />
              <span className="input-group-text" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show/hide icon */}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        {/* Redirect to Create Admin link */}
        <div className="text-center mt-3">
          <p>New Admin? <a  onClick={() => navigate('/create-admin')} className="text-decoration-none">Create an account</a></p>
        </div>

        <div className="d-grid gap-2 mt-4">
          <button onClick={handleHomeClick} className="btn btn-secondary btn-lg">
            <FaHome style={styles.icon} /> Go to Home
          </button>
        </div>
    </div>
      </div>

      
  );
};

// Styling for container and card
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
    maxWidth: '400px',
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

export default LoginForm;
