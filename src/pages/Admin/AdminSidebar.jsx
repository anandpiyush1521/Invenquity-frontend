import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SKUGuideDocument from "../../Document/SKUGuideDocument";

function AdminSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false); // State to toggle the visibility of the guide
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleViewGuideClick = () => {
    setShowGuide(true); // Show the SKU Guide Documentation when clicked
  };

  const handleCloseGuide = () => {
    setShowGuide(false); // Hide the SKU Guide Documentation when close is clicked
  };

  const handleVisualizeDataClick = () => {
    navigate("/visualize-data"); // Navigate to the ProductCharts page
  };

  return (
    <div>
      {/* Toggle Button for Small Screens */}
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        id="separator-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 bg-gray-50`}
        aria-label="Sidebar"
        style={{ position: "sticky", top: "0" }}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {/* Sidebar items */}
            {/* Dashboard */}
            <li>
              <a
                href="/admin/product/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </a>
            </li>

            {/* Products */}
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
              </a>
            </li>

            {/* Visualization */}
            <li>
              <a
                href="/admin/product/visualization"
                onClick={handleVisualizeDataClick}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">Visualize Data</span>
              </a>
            </li>

            {/* Notifications */}
            <li className="relative">
              <a
                href="/admin/product/notification"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Notifications</span>
                {/* Red dot for notifications */}
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </a>
            </li>
          </ul>

          {/* Separator and Additional Actions */}
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200">
            <li>
              <a
                href="#"
                onClick={handleViewGuideClick}
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <span className="ms-3">View Guide</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Conditionally Render the SKUGuideDocument */}
      {showGuide && <SKUGuideDocument onClose={handleCloseGuide} />}
    </div>
  );
}

export default AdminSidebar;