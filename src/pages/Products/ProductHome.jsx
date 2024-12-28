import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
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
} from "lucide-react";
import PageTitle from "../../components/PageTitle";

function ProductHome() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [skuFilter, setSkuFilter] = useState(""); // New state for SKU filter
  const [products, setProducts] = useState([]);
  const [showLowStockPopup, setShowLowStockPopup] = useState(false); // State for popup visibility

  // Fetch product data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/invenquity/product"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, []);

  // Derived metrics
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

  // Get unique categories
  const categories = [
    "All",
    ...new Set(products.map((item) => item.productCategory)),
  ];

  // Filter products based on search, category, and SKU code
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || product.productCategory === categoryFilter;
    const matchesSku =
      skuFilter === "" ||
      product.skuCode.toLowerCase().includes(skuFilter.toLowerCase());
    return matchesSearch && matchesCategory && matchesSku;
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <PageTitle title="Product Dashboard" />

      {/* Main Content Area */}
      <div className="flex-grow p-6 bg-white overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Product Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Manage and visualize your product data effectively with our advanced
          tools.
        </p>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">
                  ${totalValue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold">{averageRating}</p>
              </div>
            </div>
          </div>

          {/* Low Stock Items - Clickable */}
          <div
            className="bg-white p-6 rounded-lg shadow cursor-pointer hover:bg-gray-100"
            onClick={() => setShowLowStockPopup(true)} // Show popup on click
          >
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold">{lowStockProducts.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {/* SKU Filter shifted to the right */}
          <div className="relative ml-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Filter by SKU..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={skuFilter}
              onChange={(e) => setSkuFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-bold">Product List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4">{product.productName}</td>
                    <td className="px-6 py-4">{product.skuCode}</td>{" "}
                    {/* SKU Code in the table */}
                    <td className="px-6 py-4">{product.productCategory}</td>
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          product.quantity < product.minimumProducts
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {product.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4">{product.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Low Stock Popup Card */}
      {showLowStockPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6 relative">
            <button
              onClick={() => setShowLowStockPopup(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              Low Stock Items
            </h2>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between"
                >
                  <span className="text-lg font-medium">
                    {product.productName}
                  </span>
                  <span className="text-red-500 font-bold">
                    {product.quantity} in stock
                  </span>
                  <span className="text-sm text-gray-600 font-bold">
                    SKU: {product.skuCode}
                  </span>{" "}
                  {/* Display SKU Code in the popup */}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductHome;
