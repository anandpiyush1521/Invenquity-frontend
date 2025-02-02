import React from "react";
import { motion } from "framer-motion";

function AccountIssues(){
  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-indigo-600">Account Issues</h1>
      <p className="text-gray-700 text-lg text-center mb-6">
        Facing login or account-related issues? Find solutions below.
      </p>
      <motion.div className="space-y-4">
        <motion.div className="border border-gray-300 p-4 rounded-md shadow-lg" whileHover={{ scale: 1.02 }}>
          <h3 className="font-semibold text-lg text-indigo-800">Forgot Password?</h3>
          <p className="text-gray-700 mt-2">Click on ‘Forgot Password’ on the login page to reset it.</p>
        </motion.div>
        <motion.div className="border border-gray-300 p-4 rounded-md shadow-lg" whileHover={{ scale: 1.02 }}>
          <h3 className="font-semibold text-lg text-indigo-800">Unable to Login?</h3>
          <p className="text-gray-700 mt-2">Ensure your credentials are correct and your account is verified.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default AccountIssues;