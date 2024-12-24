import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking if the JWT token is present
    const token = localStorage.getItem("token");
    console.log("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token"); // Get the JWT token
  
    if (!token) {
      console.error("No token found");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/api/invenquity/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, // Include Bearer prefix
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        console.log("User logged out successfully");
        localStorage.removeItem("token"); // Remove token from storage
        setIsLoggedIn(false); // Update login state
        navigate("/login"); // Redirect to login page
      } else {
        const errorText = await response.text(); // Read plain text error response
        console.error("Logout failed:", errorText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  

  return (
    <div>
      <nav className="flex items-center justify-between p-5 shadow-md">
        <a href="/" className="text-2xl font-bold">
          <span className="text-black">Inven</span>
          <span className="text-indigo-600 font-extrabold">
            <u>Quity</u>
          </span>
        </a>
        <div>
          {isLoggedIn ? (
            <>
              <a href="/admin-home" className="bg-black text-white px-4 py-2 rounded-md mr-2">
                Admin Dashboard
              </a>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/admin-login" className="bg-black text-white px-4 py-2 rounded-md mr-2">
                Admin
              </a>
              <a href="/login" className="bg-black text-white px-4 py-2 rounded-md">
                Login
              </a>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
