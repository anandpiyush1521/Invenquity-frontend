import React from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js"; // ✅ Import Stripe
import PageTitle from "../../components/PageTitle";

// ✅ Load Stripe with your publishable key
const stripePromise = loadStripe("pk_test_51NJRc9SF6siS2FbRW6DveI59HgkHVFKOCqkCUdthFawsdO58FDdeJYpsTdFP4xBo8Pwv5X2xwjFEYqQLEKmIHg2a00MFBOyL42");

const SubscriptionForm = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Advanced Inventory Management",
      description: "Real-time tracking with low stock alerts, batch tracking, and inventory forecasting",
      details: ["Automated stock level monitoring", "Predictive inventory analytics", "Custom stock level thresholds", "Inventory valuation reports"],
    },
    {
      title: "Comprehensive Notification System",
      description: "Multi-channel alerts and communication system",
      details: ["Email notifications", "In-app alerts", "SMS notifications (optional)", "Custom notification templates"],
    },
    {
      title: "Enhanced Security & Authentication",
      description: "Enterprise-grade security features",
      details: ["Two-factor authentication", "Role-based access control", "Session management", "Audit logging"],
    },
    {
      title: "Analytics & Reporting",
      description: "Detailed insights and customizable reports",
      details: ["Real-time dashboard", "Customizable reports", "Export functionality", "Data visualization"],
    },
    {
      title: "Integration & API Access",
      description: "Seamless connectivity with your existing tools",
      details: ["RESTful API access", "Webhook support", "Third-party integrations", "API documentation"],
    },
  ];

  const Feature = ({ feature, index }) => (
    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <h3 className="text-xl font-semibold text-indigo-600 mb-3">{feature.title}</h3>
      <p className="text-gray-600 mb-4">{feature.description}</p>
      <ul className="space-y-2">
        {feature.details.map((detail, idx) => (
          <li key={idx} className="flex items-center text-gray-700">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );

  // ✅ Stripe Checkout Logic
  const handleStripeCheckout = async () => {
    const customerEmail = prompt("Enter your email:");
    if (!customerEmail) {
      alert("Email is required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/invenquity/subscription/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: customerEmail }),
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      const data = await response.json();
      const { sessionId } = data;

      if (sessionId) {
        const stripe = await stripePromise; // ✅ Ensure Stripe is initialized
        stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <PageTitle title="Subscription Form" />
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Basic Plan Subscription</h1>
          <p className="text-xl text-gray-600">Everything you need to streamline your business</p>
          <div className="mt-6">
            <span className="text-5xl font-bold text-indigo-600">₹60</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Feature key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Advance Plan Button (Stripe Checkout) */}
        <div className="flex justify-center">
          <button
            onClick={handleStripeCheckout}
            className="bg-green-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Click here to Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;