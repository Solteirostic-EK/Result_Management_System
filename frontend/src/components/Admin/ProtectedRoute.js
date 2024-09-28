import React from 'react';
import { Navigate } from 'react-router-dom';

// A component to check if the user is authenticated
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // If the token is missing, redirect to the login page
  return token ? children : <Navigate to="/admin-login" />;
};

export default PrivateRoute;
