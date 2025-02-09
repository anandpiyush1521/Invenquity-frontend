import React from "react";

const ViewProductDetails = ({ open, onClose, product }) => {
  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Product Image */}
        <div className="flex justify-center mb-4">
          <img
            src={product.image || "https://via.placeholder.com/300"}
            alt={product.productName}
            className="w-40 h-40 object-cover rounded-md border"
          />
        </div>

        {/* Product Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">{product.productName}</h2>
        <p className="text-gray-500 text-center">{product.productCategory}</p>

        {/* Product Details Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-100 p-3 rounded-md">
            <span className="text-gray-600 text-sm">SKU Code</span>
            <p className="text-gray-900 font-medium">{product.skuCode}</p>
          </div>

          <div className="bg-gray-100 p-3 rounded-md">
            <span className="text-gray-600 text-sm">Price</span>
            <p className="text-gray-900 font-medium">₹{product.price.toFixed(2)}</p>
          </div>

          <div className="bg-gray-100 p-3 rounded-md">
            <span className="text-gray-600 text-sm">Quantity Available</span>
            <p className="text-gray-900 font-medium">{product.quantity}</p>
          </div>

          <div className="bg-gray-100 p-3 rounded-md">
            <span className="text-gray-600 text-sm">Minimum Required</span>
            <p className="text-gray-900 font-medium">{product.minimumProducts}</p>
          </div>

          <div className="bg-gray-100 p-3 rounded-md">
            <span className="text-gray-600 text-sm">Rating</span>
            <p className="text-gray-900 font-medium">{product.rating} ⭐</p>
          </div>

          <div className="bg-gray-100 p-3 rounded-md">
            <span className="text-gray-600 text-sm">Added On</span>
            <p className="text-gray-900 font-medium">
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-4">
          <span className="text-gray-600 text-sm">Description</span>
          <p className="text-gray-800 mt-1">{product.description}</p>
        </div>

        {/* Close Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProductDetails;
