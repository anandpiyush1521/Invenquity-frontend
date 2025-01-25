import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FaUsers, FaProductHunt, FaClipboardList } from 'react-icons/fa'; // Added icons for better UI
import PageTitle from '../../components/PageTitle';
import { BounceLoader } from 'react-spinners'; // Add loading spinner package

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
        <BounceLoader size={60} color="#fff" />
        <h1 className="text-4xl font-bold animate-pulse mb-4">Loading...</h1>
        <p className="text-lg text-center opacity-90 animate__animated animate__fadeInUp">
          Please wait while we verify your credentials.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <PageTitle title="InvenQuity | AdminHome" />
      <h1 className="text-5xl font-extrabold mb-8 text-center text-white animate__animated animate__fadeInDown">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
        {/* User Registration Card */}
        <div className="bg-white p-8 rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out transform hover:bg-blue-50">
          <div className="flex items-center justify-between mb-4">
            <FaUsers className="text-blue-500 text-4xl" />
            <div className="text-right">
              <h2 className="text-3xl font-bold text-gray-800">User Registration</h2>
              <p className="text-gray-600">Register users, Verify their details.</p>
            </div>
          </div>
          <a href="/admin/user-registration" className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
            Go to User Actions
          </a>
        </div>

        {/* User Action Card */}
        <div className="bg-white p-8 rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out transform hover:bg-yellow-50">
          <div className="flex items-center justify-between mb-4">
            <FaClipboardList className="text-yellow-500 text-4xl" />
            <div className="text-right">
              <h2 className="text-3xl font-bold text-gray-800">User Actions</h2>
              <p className="text-gray-600">Manage users, view their activity, and perform actions like banning, etc.</p>
            </div>
          </div>
          <a href="/admin/user-details" className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105">
            Go to User Actions
          </a>
        </div>

        {/* Product Action Card */}
        <div className="bg-white p-8 rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out transform hover:bg-green-50">
          <div className="flex items-center justify-between mb-4">
            <FaProductHunt className="text-green-500 text-4xl" />
            <div className="text-right">
              <h2 className="text-3xl font-bold text-gray-800">Product Actions</h2>
              <p className="text-gray-600">Manage products, update pricing, add new products, and more.</p>
            </div>
          </div>
          <a href="/admin/product/dashboard" className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
            Go to Product Actions
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
