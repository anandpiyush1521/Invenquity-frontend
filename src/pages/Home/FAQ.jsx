import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import PageTitle from '../../components/PageTitle';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [faqs, setFaqs] = useState([
    {
      question: "What is InvenQuity?",
      answer: "InvenQuity is an innovative inventory management system designed to streamline business operations efficiently.",
      category: "general",
      open: false,
    },
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking on 'Forgot Password' on the login page and following the instructions.",
      category: "account",
      open: false,
    },
    {
      question: "How can I contact support?",
      answer: "You can reach out to us via email at support@invenquity.com or through our Contact Us page.",
      category: "support",
      open: false,
    },
    {
      question: "Is my data secure with InvenQuity?",
      answer: "Yes, we use advanced encryption and security measures to keep your data safe.",
      category: "security",
      open: false,
    },
    {
      question: "Can I integrate InvenQuity with other software?",
      answer: "Yes, InvenQuity provides API integrations to seamlessly connect with other tools.",
      category: "integration",
      open: false,
    },
    {
      question: "Does InvenQuity offer multi-user support?",
      answer: "Yes, our system supports multiple user roles with different levels of access control.",
      category: "account",
      open: false,
    }
  ]);

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "general", name: "General" },
    { id: "account", name: "Account" },
    { id: "support", name: "Support" },
    { id: "security", name: "Security" },
    { id: "integration", name: "Integration" }
  ];

  const toggleFAQ = (index) => {
    setFaqs(faqs.map((faq, i) => (i === index ? { ...faq, open: !faq.open } : { ...faq, open: false })));
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <PageTitle title="InvenQuity | FAQ" />
      <div className="max-w-4xl mx-auto p-6 lg:p-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about InvenQuity
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white/80 backdrop-blur-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600 hover:bg-indigo-50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <motion.div className="space-y-4">
          <AnimatePresence>
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 flex justify-between items-center"
                >
                  <h3 className="font-semibold text-lg text-gray-800">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: faq.open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {faq.open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-6"
                    >
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-gray-600 mt-2">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;