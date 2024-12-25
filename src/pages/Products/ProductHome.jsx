import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';

function ProductHome() {

  return (
    <div className="flex h-screen">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow p-6 bg-white overflow-y-auto ">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Invenquity</h1>
        <p className="text-lg text-gray-600 mb-6">
          Manage and visualize your product data effectively with our advanced tools.
        </p>
      </div>
    </div>
  );
}

export default ProductHome;
