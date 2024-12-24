import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import UserDetailsModal from './UserDetailsModal';

function UserDetails() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("id");
  const [userDetails, setUserDetails] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role === "ADMIN") {
        setIsAdmin(true);
        // Extract user details from token
        const { iat, exp, ...filteredUserInfo } = decodedToken;
        setUserInfo(filteredUserInfo);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/login");
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/invenquity/user",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/invenquity/user/${searchType}/${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setUserDetails(data);
      setIsModalOpen(true); // Open modal when user details are fetched
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/invenquity/user/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.ok) {
        alert("User deleted successfully");
        fetchUsers(); // Re-fetch users after deletion
        setIsModalOpen(false);
        setUserDetails(null);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/edit-user/${userId}`); // Redirect to edit page
  };

  if (!isAdmin) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-600">
        User Details Dashboard
      </h1>

      {/* Admin Info */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Admin Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(userInfo).map(([key, value]) => (
            <div
              key={key}
              className="bg-gray-50 p-6 rounded-lg shadow-sm hover:bg-blue-100 transition-colors duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="text-blue-500 text-2xl">
                  {key === "email" && <i className="fas fa-envelope"></i>}
                  {key === "first_name" && <i className="fas fa-user"></i>}
                  {key === "address" && <i className="fas fa-map-marker-alt"></i>}
                  {key === "role" && <i className="fas fa-user-shield"></i>}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    {key.replace("_", " ")}
                  </p>
                  <p className="text-lg font-medium text-gray-700">{value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fetch Users Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={fetchUsers}
          className="bg-blue-500 text-white px-8 py-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
        >
          Fetch All Users
        </button>
      </div>

      {/* Search User */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
        <label className="block text-gray-700 text-lg font-bold mb-4">
          Search User
        </label>
        <div className="flex items-center space-x-4">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-300"
          >
            <option value="id">ID</option>
            <option value="username">Username</option>
            <option value="email">Email</option>
          </select>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter value..."
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={fetchUserDetails}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            Search
          </button>
        </div>
      </div>

      {/* User Details Modal */}
      <UserDetailsModal 
        user={userDetails}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setUserDetails(null);
        }}
        onEdit={() => handleEditUser(userDetails?.id)}
        onDelete={() => handleDeleteUser(userDetails?.id)}
      />

      {/* All Users */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Users</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <li
              key={user.id}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex flex-col space-y-4">
                <p className="text-2xl font-semibold text-blue-600">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-bold">User Id:</span>{" "}
                  {user.userId || "Id not provided"}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-bold">Role:</span>{" "}
                  {user.role || "Role not provided"}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-bold">Email:</span>{" "}
                  {user.email || "Email not provided"}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-bold">Address:</span>{" "}
                  {user.address || "No Address Provided"}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-bold">Registered On:</span>{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Invalid Date"}
                </p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleEditUser(user.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserDetails;