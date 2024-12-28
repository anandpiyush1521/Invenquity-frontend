import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const AddProduct = () => {
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

  const handleSubmit = async () => {
    try {
      const response = isBulk
        ? await axios.post("http://localhost:8080/api/invenquity/product/bulk", products)
        : await axios.post("http://localhost:8080/api/invenquity/product", product);
      alert("Product(s) added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding product(s):", error);
      alert("Failed to add product(s).");
    }
  };

  return (
    <div className="flex">
        <Sidebar />
      <motion.div
        className="container mx-auto p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isBulk ? "Add Products (Bulk)" : "Add Product"}
        </h1>

        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 rounded ${
              isBulk ? "bg-gray-300" : "bg-green-500 text-white"
            }`}
            onClick={() => setIsBulk(false)}
          >
            Single
          </button>
          <button
            className={`px-4 py-2 rounded ml-4 ${
              isBulk ? "bg-green-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setIsBulk(true)}
          >
            Bulk
          </button>
        </div>

        {!isBulk ? (
          <motion.div
            className="mb-4 p-4 border rounded-lg shadow-lg bg-white"
            whileHover={{ scale: 1.05 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="productCategory"
                value={product.productCategory}
                onChange={handleSingleChange}
                placeholder="Category"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleSingleChange}
                placeholder="Product Name"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="skuCode"
                value={product.skuCode}
                onChange={handleSingleChange}
                placeholder="SKU Code"
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="rating"
                value={product.rating}
                onChange={handleSingleChange}
                placeholder="Rating"
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="quality"
                value={product.quality}
                onChange={handleSingleChange}
                placeholder="Quality"
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleSingleChange}
                placeholder="Quantity"
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="minimumProducts"
                value={product.minimumProducts}
                onChange={handleSingleChange}
                placeholder="Minimum Products"
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleSingleChange}
                placeholder="Price"
                className="border p-2 rounded"
              />
              <textarea
                name="description"
                value={product.description}
                onChange={handleSingleChange}
                placeholder="Description"
                className="border p-2 rounded col-span-2"
              ></textarea>
            </div>
          </motion.div>
        ) : (
          <motion.div className="space-y-4">
            {products.map((prod, index) => (
              <motion.div
                key={index}
                className="p-4 border rounded-lg shadow-lg bg-white"
                whileHover={{ scale: 1.05 }}
              >
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(prod).map((key) => (
                    <input
                      key={key}
                      type="text"
                      name={key}
                      value={prod[key]}
                      onChange={(e) => handleBulkChange(index, e)}
                      placeholder={key}
                      className="border p-2 rounded"
                    />
                  ))}
                </div>
              </motion.div>
            ))}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={addBulkProduct}
            >
              Add More
            </button>
          </motion.div>
        )}

        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AddProduct;
