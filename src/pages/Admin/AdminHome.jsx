import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import jwt_decode from 'jwt-decode'; 

function AdminHome() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated and has the correct role
    const token = localStorage.getItem('token'); // Assuming the token is saved in localStorage
    console.log(token);//debugger
    if (!token) {
      navigate('/login'); // Redirect to login if the token is not found
      return;
    }

    try {
      // Decode the JWT token to get user information
      const decodedToken = jwt_decode(token);
      const userRole = decodedToken.role; // Assuming the role is stored in the token

      // Check if the user is an admin
      if (userRole === 'ADMIN') {
        setIsAdmin(true); // Set isAdmin to true if the role is ADMIN
      } else {
        navigate('/'); 
      }
    } catch (error) {
      console.error("Error decoding token", error);
      navigate('/login'); // Redirect to login if the token is invalid or expired
    }
  }, [navigate]);

  if (!isAdmin) {
    return <div>Loading...</div>; // Optionally, you can show a loading screen until the role check is completed
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600 animate__animated animate__fadeIn">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg">
        {/* User Action Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out transform animate__animated animate__fadeInLeft">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Actions</h2>
          <p className="text-gray-600 mb-4">Manage users, view their activity, and perform actions like banning, etc.</p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300">
            Go to User Actions
          </button>
        </div>

        {/* Product Action Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out transform animate__animated animate__fadeInRight">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Product Actions</h2>
          <p className="text-gray-600 mb-4">Manage products, update pricing, add new products, and more.</p>
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300">
            Go to Product Actions
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
