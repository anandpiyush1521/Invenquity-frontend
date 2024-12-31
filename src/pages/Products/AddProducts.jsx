import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Plus,
  X,
  Save,
  Archive,
  Loader2,
  CheckCircle,
} from "lucide-react";
import Sidebar from "../../components/Sidebar";
import PageTitle from "../../components/PageTitle";

function AddProduct () {
  const [product, setProduct] = useState({
    productCategory: "",
    productName: "",
    skuCode: "",
    rating: "",
    quality: "",
    quantity: "",
    minimumProducts: "",
    price: "",
    description: "",
  });

  const [products, setProducts] = useState([]);
  const [isBulk, setIsBulk] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSingleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleBulkChange = (index, event) => {
    const { name, value } = event.target;
    const updatedProducts = [...products];
    updatedProducts[index][name] = value;
    setProducts(updatedProducts);
  };

  const addBulkProduct = () => {
    setProducts([
      ...products,
      {
        productCategory: "",
        productName: "",
        skuCode: "",
        rating: "",
        quality: "",
        quantity: "",
        minimumProducts: "",
        price: "",
        description: "",
      },
    ]);
  };

  const removeBulkProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = isBulk
        ? await fetch("http://localhost:8080/api/invenquity/product/bulk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(products),
          })
        : await fetch("http://localhost:8080/api/invenquity/product", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
          });

      setSuccessMessage(
        isBulk ? "Products added successfully!" : "Product added successfully!"
      );
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding product(s):", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    { name: "productCategory", label: "Category", type: "text" },
    { name: "productName", label: "Product Name", type: "text" },
    { name: "skuCode", label: "SKU Code", type: "text" },
    { name: "rating", label: "Rating", type: "number" },
    { name: "quality", label: "Quality", type: "number" },
    { name: "quantity", label: "Quantity", type: "number" },
    { name: "minimumProducts", label: "Minimum Products", type: "number" },
    { name: "price", label: "Price", type: "number" },
  ];

  return (
    <div className="flex">
      <PageTitle title="Add Product" />
      <Sidebar />
      <div className="flex-grow p-6 ml-4">
        <div className="flex min-h-screen bg-gray-50">
          <motion.div
            className="flex-1 p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">
                  {isBulk ? "Bulk Product Upload" : "Add New Product"}
                </h1>

                <div className="flex gap-2 bg-white rounded-lg p-1 shadow-md">
                  <button
                    onClick={() => setIsBulk(false)}
                    className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2
                ${
                  !isBulk
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                  >
                    <Plus className="w-4 h-4" />
                    Single
                  </button>
                  <button
                    onClick={() => setIsBulk(true)}
                    className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2
                ${
                  isBulk
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                  >
                    <Archive className="w-4 h-4" />
                    Bulk
                  </button>
                </div>
              </div>

              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  {successMessage}
                </motion.div>
              )}

              {!isBulk ? (
                <motion.div
                  layout
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {inputFields.map((field) => (
                      <div key={field.name} className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={product[field.name]}
                          onChange={handleSingleChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder={field.label}
                        />
                      </div>
                    ))}
                    <div className="col-span-full space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={product.description}
                        onChange={handleSingleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        rows="4"
                        placeholder="Enter product description"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div layout className="space-y-6">
                  {products.map((prod, index) => (
                    <motion.div
                      key={index}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-white rounded-xl shadow-lg p-6 relative"
                    >
                      <button
                        onClick={() => removeBulkProduct(index)}
                        className="absolute top-4 right-4 p-1 hover:bg-red-50 rounded-full text-red-500 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {inputFields.map((field) => (
                          <div key={field.name} className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              {field.label}
                            </label>
                            <input
                              type={field.type}
                              name={field.name}
                              value={prod[field.name]}
                              onChange={(e) => handleBulkChange(index, e)}
                              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder={field.label}
                            />
                          </div>
                        ))}
                        <div className="col-span-full space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <textarea
                            name="description"
                            value={prod.description}
                            onChange={(e) => handleBulkChange(index, e)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            rows="4"
                            placeholder="Enter product description"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addBulkProduct}
                    className="w-full p-4 rounded-lg border-2 border-dashed border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Another Product
                  </motion.button>
                </motion.div>
              )}

              <motion.div
                className="mt-8 flex justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-6 py-3 rounded-lg bg-blue-500 text-white font-medium flex items-center gap-2 
              ${
                isSubmitting
                  ? "opacity-75 cursor-not-allowed"
                  : "hover:bg-blue-600"
              } 
              transition-all shadow-lg hover:shadow-xl`}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  {isSubmitting ? "Saving..." : "Save Product"}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
