import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import {
  Search,
  Package,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Star,
  Box,
  ShoppingCart,
  X,
  ChevronDown,
  Filter,
  RefreshCcw,
  Download
} from "lucide-react";

// CSV Download Component
const DownloadButton = ({ products }) => {
  const downloadCSV = (products) => {
    const headers = ['Product Name', 'SKU Code', 'Category', 'Price', 'Quantity', 'Rating'];
    
    const productsData = products.map(product => [
      product.productName,
      product.skuCode,
      product.productCategory,
      product.price,
      product.quantity,
      product.rating
    ]);
    
    const csvContent = [
      headers.join(','),
      ...productsData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'product_inventory.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={() => downloadCSV(products)}
      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
    >
      <Download className="h-4 w-4" />
      Export CSV
    </button>
  );
};

function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [skuFilter, setSkuFilter] = useState("");
  const [products, setProducts] = useState([]);
  const [showLowStockPopup, setShowLowStockPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8080/api/invenquity/product");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalProducts = products.length;
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const averageRating = (
    products.reduce((sum, product) => sum + product.rating, 0) / totalProducts
  ).toFixed(1);
  const lowStockProducts = products.filter(
    (product) => product.quantity < product.minimumProducts
  );

  const categories = ["All", ...new Set(products.map((item) => item.productCategory))];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedProducts = (products) => {
    if (!sortConfig.key) return products;

    return [...products].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const filteredProducts = getSortedProducts(
    products.filter((product) => {
      const matchesSearch = product.productName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || product.productCategory === categoryFilter;
      const matchesSku =
        skuFilter === "" ||
        product.skuCode.toLowerCase().includes(skuFilter.toLowerCase());
      return matchesSearch && matchesCategory && matchesSku;
    })
  );

  const StatCard = ({ icon: Icon, title, value, color, onClick }) => (
    <div 
      onClick={onClick}
      className={`transform transition-all duration-300 hover:scale-105 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl cursor-pointer border-l-4 ${color}`}
    >
      <div className="flex items-center">
        <Icon className={`h-12 w-12 ${color.replace('border-', 'text-')}`} />
        <div className="ml-4">
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-grow p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Product Dashboard</h1>
              <p className="text-gray-600">
                Real-time overview of your inventory management system
              </p>
            </div>
            <div className="flex gap-4">
              <DownloadButton products={filteredProducts} />
              <button 
                onClick={() => window.location.reload()} 
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all duration-300"
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={Package}
              title="Total Products"
              value={totalProducts}
              color="border-blue-500"
            />
            <StatCard
              icon={DollarSign}
              title="Total Value"
              value={`$${totalValue.toLocaleString()}`}
              color="border-green-500"
            />
            <StatCard
              icon={Star}
              title="Average Rating"
              value={averageRating}
              color="border-yellow-500"
            />
            <StatCard
              icon={AlertTriangle}
              title="Low Stock Items"
              value={lowStockProducts.length}
              color="border-red-500"
              onClick={() => setShowLowStockPopup(true)}
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2 w-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </button>
              </div>
              <div className="flex items-center gap-4">
                <select
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Filter by SKU..."
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  value={skuFilter}
                  onChange={(e) => setSkuFilter(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {['productName', 'skuCode', 'productCategory', 'price', 'quantity', 'rating'].map((key) => (
                      <th 
                        key={key}
                        onClick={() => handleSort(key)}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-2">
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                          {sortConfig.key === key && (
                            <ChevronDown className={`h-4 w-4 transform transition-transform ${sortConfig.direction === 'desc' ? 'rotate-180' : ''}`} />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr 
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">{product.productName}</td>
                      <td className="px-6 py-4 font-mono text-sm">{product.skuCode}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs bg-gray-100">
                          {product.productCategory}
                        </span>
                      </td>
                      <td className="px-6 py-4">${product.price}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            product.quantity < product.minimumProducts
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {product.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          {product.rating}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {showLowStockPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-11/12 md:w-1/2 p-8 relative transform transition-all duration-300 scale-100">
              <button
                onClick={() => setShowLowStockPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <h2 className="text-2xl font-bold text-gray-800">Low Stock Items</h2>
              </div>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">{product.productName}</span>
                      <span className="text-sm text-gray-500">SKU: {product.skuCode}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                        {product.quantity} in stock
                      </span>
                      <span className="text-sm text-gray-600">
                        Min: {product.minimumProducts}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;