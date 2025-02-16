import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, UserCircle, Wrench, Mail, ArrowRight, Clock, Phone } from "lucide-react";
import PageTitle from '../../components/PageTitle';
import QuickLinkModal from '../../components/QuickLinkModal';

function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeQuickLink, setActiveQuickLink] = useState("");

  const topics = [
    {
      title: "Getting Started",
      description: "Learn how to set up your account and start managing inventory.",
      link: "/help/getting-started",
      icon: BookOpen,
      popularArticles: [
        "Quick Start Guide",
        "Setting Up Your First Inventory",
        "Understanding the Dashboard"
      ]
    },
    {
      title: "Account Issues",
      description: "Facing login or account-related issues? Find solutions here.",
      link: "/help/account-issues",
      icon: UserCircle,
      popularArticles: [
        "Reset Password",
        "Two-Factor Authentication",
        "Managing User Permissions"
      ]
    },
    {
      title: "Technical Support",
      description: "Need help with a bug or technical issue? Reach out to our support team.",
      link: "/help/technical-support",
      icon: Wrench,
      popularArticles: [
        "Common Error Messages",
        "System Requirements",
        "Troubleshooting Guide"
      ]
    },
    {
      title: "Contact Us",
      description: "Email us at support@invenquity.com or visit the Contact Us page.",
      link: "#",
      icon: Mail,
      popularArticles: [
        "Support Hours",
        "Response Time",
        "Emergency Contact"
      ]
    }
  ];

  const quickLinks = [
    { text: "Submit a Ticket", icon: Mail },
    { text: "Live Chat", icon: Phone },
    { text: "Support Hours", icon: Clock },
  ];

  const handleQuickLinkClick = (linkText) => {
    setActiveQuickLink(linkText);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <PageTitle title="InvenQuity | Help Center" />
      <div className="max-w-6xl mx-auto p-6 lg:p-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            How can we help you?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg mb-8"
          >
            Search our knowledge base or browse topics below
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-2xl mx-auto mb-12"
          >
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none transition-all bg-white/80 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {quickLinks.map((link, index) => (
              <button
                key={index}
                className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100"
                onClick={() => handleQuickLinkClick(link.text)}
              >
                <link.icon className="h-4 w-4 mr-2 text-indigo-600" />
                <span className="text-gray-700">{link.text}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100"
            >
              <div className="flex items-start mb-4">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <topic.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-xl text-gray-800 mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Popular Articles</h4>
                <ul className="space-y-2">
                  {topic.popularArticles.map((article, i) => (
                    <li key={i}>
                      <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={topic.link}
                className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
              >
                View all articles
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* QuickLinkModal */}
      <QuickLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeLink={activeQuickLink}
      />
    </div>
  );
}

export default HelpCenter;