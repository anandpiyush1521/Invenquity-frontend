import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      checkSessionExpiration(token);

      // Set up periodic checks for token expiration
      const checkInterval = setInterval(() => {
        checkSessionExpiration(token);
      }, 30000); // Check every 30 seconds

      // Cleanup interval on component unmount
      return () => clearInterval(checkInterval);
    }
  }, []); // Run once when component mounts

  const checkSessionExpiration = (token) => {
    try {
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = exp * 1000;
      const currentTime = new Date().getTime();
      const timeLeft = expirationTime - currentTime;

      // Show warning if less than 3 minute left
      if (timeLeft <= 3 * 60 * 1000 && timeLeft > 0) {
        setShowSessionWarning(true);
      }

      // If token has expired, log out automatically
      if (timeLeft <= 0) {
        handleSessionExpire();
      }
    } catch (error) {
      console.error("Error checking session expiration:", error);
      handleSessionExpire();
    }
  };

  const handleSessionExtend = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const response = await fetch("http://localhost:8080/api/invenquity/refresh-token", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.jwt);
        setShowSessionWarning(false);
        console.log("Session extended successfully");
      } else {
        console.error("Session refresh failed. Please log in again.");
        handleSessionExpire();
      }
    }
  };

  const handleSessionExpire = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowSessionWarning(false);
    navigate("/login");
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/invenquity/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("User logged out successfully");
        handleSessionExpire();
      } else {
        const errorText = await response.text();
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

      {showSessionWarning && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex justify-end">
              <button
                className="text-xl text-gray-500"
                onClick={() => setShowSessionWarning(false)}
              >
                ×
              </button>
            </div>
            <p className="text-center text-gray-800">Your session is about to expire in 3 minute.</p>
            <div className="flex justify-around mt-4">
              <button
                onClick={handleSessionExtend}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Continue Session
              </button>
              <button
                onClick={handleSessionExpire}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;