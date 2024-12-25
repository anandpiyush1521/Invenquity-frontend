import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ProductCharts from './Charts/ProductCharts';

function ProductHome() {
  const [showCharts, setShowCharts] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggleCharts = async () => {
    setLoading(true);
    setTimeout(() => {
      setShowCharts(!showCharts);
      setLoading(false);
    }, 500); // Simulate loading time
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow p-6 bg-gray-100 overflow-y-auto ml-64">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Invenquity</h1>
        <p className="text-lg text-gray-600 mb-6">
          Manage and visualize your product data effectively with our advanced tools.
        </p>

        {/* Toggle Chart Button */}
        <button 
          onClick={handleToggleCharts}
          disabled={loading}
          className={`inline-block px-6 py-3 text-white rounded-lg shadow-md transition-all duration-300 mb-4 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {loading ? 'Loading...' : showCharts ? 'Hide Visualizations' : 'Visualize Data'}
        </button>

        {/* Dynamic Charts Section */}
        {showCharts && !loading && (
          <div className="mt-6">
            <ProductCharts />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductHome;
