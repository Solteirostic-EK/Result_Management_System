const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../middleware/authMiddleware');

// Create new Admin
const createAdmin = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Validate input
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password is required and should be at least 6 characters long' });
    }

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this username already exists' });
    }

    const existingEmail = await Admin.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password, 12);

    // Create new admin
    const admin = new Admin({
      username,
      password: hashedPassword,
      email, // Include email in the new admin object
    });

    // Save admin to the database
    await admin.save();
    jwt.sign(
      { id: admin._id, name: admin.username }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }, // Optionally add expiration
      (err, token) => {
        if (err) throw err;

        console.log("Token generated successfully:", token);
        
        // Send the new token back to the client
        return res.status(201).json({ token, user: admin, message: 'Admin successfully created' });
      }
    );

  } catch (error) {  
    console.error('Error while creating admin:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare the password
    if (admin && (await comparePassword(password, admin.password))) {
      // Generate a new JWT token on every login
      jwt.sign(
        { id: admin._id, name: admin.username }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }, // Optionally add expiration
        (err, token) => {
          if (err) throw err;

          console.log("Token generated successfully:", token);
          
          // Send the new token back to the client
          return res.status(200).json({ token, user: admin, message: 'Login successful' });
        }
      );
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createAdmin, loginAdmin };
