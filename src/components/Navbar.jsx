import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("bg-gray-900", isDarkMode);
    document.body.classList.toggle("text-white", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      checkSessionExpiration(token);

      const checkInterval = setInterval(() => {
        checkSessionExpiration(token);
      }, 30000);

      return () => clearInterval(checkInterval);
    }
  }, [isDarkMode]);
  

  const checkSessionExpiration = (token) => {
    try {
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = exp * 1000;
      const currentTime = new Date().getTime();
      const timeLeft = expirationTime - currentTime;

      if (timeLeft <= 3 * 60 * 1000 && timeLeft > 0) {
        setShowSessionWarning(true);
      }
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
    navigate("/");
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

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className={`flex items-center justify-between p-5 shadow-md ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <a href="/" className="text-2xl font-bold">
          <span className={isDarkMode ? "text-white" : "text-black"}>Inven</span>
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

      {/* Session Warning Popup */}
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
            <p className="text-center text-gray-800">Your session is about to expire in 3 minutes.</p>
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

      {/* Dark Mode Toggle Popup (Stuck in Corner) */}
      <div className="fixed bottom-5 right-5 p-4 bg-gray-700 text-white rounded-lg shadow-lg flex items-center space-x-3 z-50">
        <span>Dark Mode</span>
        <button
          onClick={toggleTheme}
          className={`w-10 h-6 flex items-center rounded-full p-1 transition duration-300 ${
            isDarkMode ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              isDarkMode ? "translate-x-4" : ""
            }`}
          />
        </button>
        {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
      </div>
    </div>
  );
}

export default Navbar;
