import React, { useState, useEffect } from "react";
import { Camera, Search, Package, Filter, Star } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

const AdminProductInfo = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [skuFilter, setSkuFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Data
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/invenquity/product"
      );
      const data = await response.json();
      setProducts(data);
      const uniqueCategories = [
        "All",
        ...new Set(data.map((product) => product.productCategory)),
      ];
      setCategories(uniqueCategories);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter Products
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
    <div className="flex">
      <AdminSidebar />
      <div className="flex-grow p-6 ml-4">
        <div className="flex min-h-screen bg-gray-50">
          <div className="flex-1 p-8">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Product Inventory
              </h1>
              <p className="text-gray-600">
                Manage and monitor your product catalog
              </p>
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex flex-wrap gap-4">
                {/* Search Input */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* SKU Filter */}
                <div className="relative flex-1 min-w-[200px]">
                  <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Filter by SKU..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={skuFilter}
                    onChange={(e) => setSkuFilter(e.target.value)}
                  />
                </div>

                {/* Category Filter */}
                <div className="relative flex-1 min-w-[200px]">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src="/api/placeholder/400/320"
                        alt={product.productName}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-sm font-medium">
                          {product.productCategory}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {product.productName}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {product.description}
                      </p>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600">Price</span>
                          <span className="text-lg font-bold text-gray-800">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600">Stock</span>
                          <span
                            className={`px-2 py-1 rounded-full text-sm font-medium ${
                              product.quantity > 10
                                ? "bg-green-100 text-green-600"
                                : product.quantity > 0
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {product.quantity} units
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">SKU</span>
                          <span className="text-sm font-mono text-gray-800">
                            {product.skuCode}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Products Found */}
            {!isLoading && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductInfo;
