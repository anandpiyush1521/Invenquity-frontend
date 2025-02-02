import React from "react";
import { motion } from "framer-motion";

function HelpCenter() {
  const topics = [
    {
      title: "Getting Started",
      description:
        "Learn how to set up your account and start managing inventory.",
      link: "/help/getting-started",
    },
    {
      title: "Account Issues",
      description:
        "Facing login or account-related issues? Find solutions here.",
      link: "/help/account-issues",
    },
    {
      title: "Technical Support",
      description:
        "Need help with a bug or technical issue? Reach out to our support team.",
      link: "/help/technical-support",
    },
    {
      title: "Contact Us",
      description:
        "Email us at support@invenquity.com or visit the Contact Us page.",
      link: "#",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-indigo-600">
        Help Center
      </h1>
      <p className="text-gray-700 text-center mb-4 text-lg">
        Need assistance? Browse our support topics or contact us for more help.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {topics.map((topic, index) => (
          <motion.a
            key={index}
            href={topic.link}
            className="border border-gray-300 p-4 rounded-md shadow-md hover:bg-indigo-100 transition flex flex-col items-start"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="font-semibold text-lg text-indigo-900">
              {topic.title}
            </h3>
            <p className="text-gray-600 mt-2">{topic.description}</p>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export default HelpCenter;
