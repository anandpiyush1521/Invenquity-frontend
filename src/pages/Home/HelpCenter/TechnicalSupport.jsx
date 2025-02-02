import React from "react";
import { motion } from "framer-motion";
function TechnicalSupport() {
  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-indigo-600">Technical Support</h1>
      <p className="text-gray-700 text-lg text-center mb-6">
        Need help with a bug or technical issue? Reach out to our support team.
      </p>
      <motion.div className="space-y-4">
        <motion.div className="border border-gray-300 p-4 rounded-md shadow-lg" whileHover={{ scale: 1.02 }}>
          <h3 className="font-semibold text-lg text-indigo-800">Report a Bug</h3>
          <p className="text-gray-700 mt-2">Submit a bug report to help us improve the system.</p>
        </motion.div>
        <motion.div className="border border-gray-300 p-4 rounded-md shadow-lg" whileHover={{ scale: 1.02 }}>
          <h3 className="font-semibold text-lg text-indigo-800">Contact Support</h3>
          <p className="text-gray-700 mt-2">Email us at support@invenquity.com or call our support team.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default TechnicalSupport;
