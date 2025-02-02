import React, { useState } from "react";
import { motion } from "framer-motion";

// FAQ Page (faq.js)
const FAQ = () => {
  const [faqs, setFaqs] = useState([
    {
      question: "What is InvenQuity?",
      answer: "InvenQuity is an innovative inventory management system designed to streamline business operations efficiently.",
      open: false,
    },
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking on 'Forgot Password' on the login page and following the instructions.",
      open: false,
    },
    {
      question: "How can I contact support?",
      answer: "You can reach out to us via email at support@invenquity.com or through our Contact Us page.",
      open: false,
    },
    {
      question: "Is my data secure with InvenQuity?",
      answer: "Yes, we use advanced encryption and security measures to keep your data safe.",
      open: false,
    },
    {
      question: "Can I integrate InvenQuity with other software?",
      answer: "Yes, InvenQuity provides API integrations to seamlessly connect with other tools.",
      open: false,
    },
    {
      question: "Does InvenQuity offer multi-user support?",
      answer: "Yes, our system supports multiple user roles with different levels of access control.",
      open: false,
    }
  ]);

  const toggleFAQ = (index) => {
    setFaqs(faqs.map((faq, i) => (i === index ? { ...faq, open: !faq.open } : faq)));
  };

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-indigo-600">Frequently Asked Questions</h1>
      <motion.div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border border-gray-300 p-4 rounded-md shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="font-semibold text-lg cursor-pointer text-indigo-800" onClick={() => toggleFAQ(index)}>
              {faq.question}
            </h3>
            {faq.open && <p className="text-gray-700 mt-2">{faq.answer}</p>}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FAQ;