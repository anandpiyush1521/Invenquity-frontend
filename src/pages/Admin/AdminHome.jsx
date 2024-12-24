import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { jwtDecode } from 'jwt-decode';

function AdminHome() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      if (userRole === 'ADMIN') {
        setIsAdmin(true);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Error decoding token", error);
      navigate('/login');
    }
  }, [navigate]);

  if (!isAdmin) {
    return <div className="flex items-center justify-center h-screen text-2xl font-semibold">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-white animate__animated animate__fadeInDown">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-4xl">

      <div className="bg-white p-8 rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out transform animate__animated animate__fadeInLeft">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">User Registration</h2>
          <p className="text-gray-600 mb-6">Register users, Verify their details.</p>
          <a href="/admin/user-details" className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300">
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
          <a href="/admin/product-actions" className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300">
            Go to Product Actions
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
