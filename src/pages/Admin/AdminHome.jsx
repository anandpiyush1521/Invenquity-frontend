import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import PageTitle from '../../components/PageTitle';

function AdminHome() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token

    if (!token) {
      alert('You must log in to access this page.');
      navigate('/admin-login'); // Redirect to login if no token is present
      return;
    }

    try {
      const decodedToken = jwtDecode(token); // Decode JWT token
      const userRole = decodedToken.role; // Get user role from token

      if (userRole === 'ADMIN') {
        setIsAdmin(true); // Allow access to admin
      } else {
        alert('Access Denied: Admin privileges required! Returning to previous page.');
        navigate(-1); // Navigate back to the previous page
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      alert('Invalid session. Please log in again.');
      navigate('/login'); // Redirect to login if token is invalid
    } finally {
      setIsLoading(false); // Stop loading
    }
  }, [navigate]);

  // Show loading spinner while validating token
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
        {/* Spinner Animation */}
        <div className="relative flex items-center justify-center w-20 h-20 mb-8">
          <div className="w-full h-full border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          <div className="absolute w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin-slow"></div>
        </div>
  
        {/* Loading Text */}
        <h1 className="text-4xl font-bold animate-pulse mb-4">Loading...</h1>
        <p className="text-lg text-center opacity-90 animate__animated animate__fadeInUp">
          Please wait while we verify your credentials.
        </p>
  
        {/* Tips or Messages */}
        <div className="mt-6">
          <p className="text-sm opacity-80">
            Tip: Ensure your internet connection is stable.
          </p>
        </div>
      </div>
    );
  }
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <PageTitle title="InvenQuity | AdminHome" />
      <h1 className="text-5xl font-extrabold mb-8 text-center text-white animate__animated animate__fadeInDown">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-4xl">

        {/* User Registration Card */}
        <div className="bg-white p-8 rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out transform animate__animated animate__fadeInLeft">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">User Registration</h2>
          <p className="text-gray-600 mb-6">Register users, Verify their details.</p>
          <a href="/admin/user-registration" className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300">
            Go to User Actions
          </a>
        </div>

        {/* User Action Card */}
        <div className="bg-white p-8 rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out transform animate__animated animate__fadeInLeft">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">User Actions</h2>
          <p className="text-gray-600 mb-6">Manage users, view their activity, and perform actions like banning, etc.</p>
          <a href="/admin/user-details" className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300">
            Go to User Actions
          </a>
        </div>

        {/* Product Action Card */}
        <div className="bg-white p-8 rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out transform animate__animated animate__fadeInRight">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Product Actions</h2>
          <p className="text-gray-600 mb-6">Manage products, update pricing, add new products, and more.</p>
          <a href="/admin/product/dashboard" className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300">
            Go to Product Actions
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
