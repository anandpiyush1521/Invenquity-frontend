import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    skuCode: '',
    productCategory: '',
    quantity: 0,
    minimumProducts: 0,
    price: 0.0,
    description: '',
    rating: 0.0,
  });

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/invenquity/product');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add a new product
  const addProduct = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/invenquity/product', formData);
      toast.success('Product added successfully!');
      setProducts([...products, response.data]);
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    }
  };

  // Update product by SKU code
  const updateProductBySku = async (skuCode) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/invenquity/product/sku/${skuCode}`, formData);
      toast.success('Product updated successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  // Delete product by SKU code
  const deleteProductBySku = async (skuCode) => {
    try {
      await axios.delete(`http://localhost:8080/api/invenquity/product/sku/${skuCode}`);
      toast.success('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Product Management</h1>

      {/* Product Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type={typeof formData[key] === 'number' ? 'number' : 'text'}
            name={key}
            placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
            value={formData[key]}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        ))}
        <button onClick={addProduct} className="bg-blue-500 text-white p-2 rounded col-span-full">Add Product</button>
      </div>

      {/* Product List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.skuCode} className="border p-4 rounded shadow-md hover:shadow-lg transition">
              <h3 className="font-bold text-lg">{product.productName}</h3>
              <p><strong>SKU:</strong> {product.skuCode}</p>
              <p><strong>Category:</strong> {product.productCategory}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Quantity:</strong> {product.quantity}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Rating:</strong> {product.rating}</p>
              <div className="flex justify-between mt-4">
                <button onClick={() => updateProductBySku(product.skuCode)} className="bg-yellow-500 text-white p-2 rounded">Update</button>
                <button onClick={() => deleteProductBySku(product.skuCode)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
