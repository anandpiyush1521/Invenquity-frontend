import React from "react";
import { motion } from "framer-motion";

function GettingStarted(){
  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-indigo-600">Getting Started</h1>
      <p className="text-gray-700 text-lg text-center mb-6">
        Learn how to set up your account and start managing inventory efficiently.
      </p>
      <motion.div className="space-y-4">
        <motion.div className="border border-gray-300 p-4 rounded-md shadow-lg" whileHover={{ scale: 1.02 }}>
          <h3 className="font-semibold text-lg text-indigo-800">Step 1: Create an Account</h3>
          <p className="text-gray-700 mt-2">Sign up using your email and verify your account.</p>
        </motion.div>
        <motion.div className="border border-gray-300 p-4 rounded-md shadow-lg" whileHover={{ scale: 1.02 }}>
          <h3 className="font-semibold text-lg text-indigo-800">Step 2: Add Your Inventory</h3>
          <p className="text-gray-700 mt-2">Start by adding products and categories to your inventory.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default GettingStarted;