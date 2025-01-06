import React from 'react';
import { Navigate } from 'react-router-dom';

// Private Route Component
function PrivateRoute ({ element, allowedRoles }) {
  const token = localStorage.getItem('jwt'); // Fetch token from local storage

  if (!token) {
    return <Navigate to="/login" replace />; // Redirect to login if no token
  }

  try {
    // Decode token to extract role
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userRole = payload.role;

    // Check if the user role is allowed for the route
    if (allowedRoles.includes(userRole)) {
      return element;
    } else {
      return <Navigate to="/" replace />; // Redirect to home for unauthorized access
    }
  } catch (error) {
    console.error('Invalid token:', error);
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
