import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";

const SubscriptionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    {
      title: "Advanced Inventory Management",
      description:
        "Real-time tracking with low stock alerts, batch tracking, and inventory forecasting",
      details: [
        "Automated stock level monitoring",
        "Predictive inventory analytics",
        "Custom stock level thresholds",
        "Inventory valuation reports",
      ],
    },
    {
      title: "Comprehensive Notification System",
      description: "Multi-channel alerts and communication system",
      details: [
        "Email notifications",
        "In-app alerts",
        "SMS notifications (optional)",
        "Custom notification templates",
      ],
    },
    {
      title: "Enhanced Security & Authentication",
      description: "Enterprise-grade security features",
      details: [
        "Two-factor authentication",
        "Role-based access control",
        "Session management",
        "Audit logging",
      ],
    },
    {
      title: "Analytics & Reporting",
      description: "Detailed insights and customizable reports",
      details: [
        "Real-time dashboard",
        "Customizable reports",
        "Export functionality",
        "Data visualization",
      ],
    },
    {
      title: "Integration & API Access",
      description: "Seamless connectivity with your existing tools",
      details: [
        "RESTful API access",
        "Webhook support",
        "Third-party integrations",
        "API documentation",
      ],
    },
  ];

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validateStep = (step) => {
    let stepErrors = {};
    switch (step) {
      case 1:
        if (!formData.firstName)
          stepErrors.firstName = "First name is required";
        if (!formData.lastName) stepErrors.lastName = "Last name is required";
        if (!formData.username) stepErrors.username = "Username is required";
        break;
      case 2:
        if (!formData.email) {
          stepErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
          stepErrors.email = "Invalid email format";
        }
        if (!formData.phone) {
          stepErrors.phone = "Phone is required";
        } else if (!validatePhone(formData.phone)) {
          stepErrors.phone = "Invalid phone format";
        }
        if (!formData.address) stepErrors.address = "Address is required";
        break;
      case 3:
        if (!formData.password) {
          stepErrors.password = "Password is required";
        } else if (!validatePassword(formData.password)) {
          stepErrors.password = "Password must meet all requirements";
        }
        if (!formData.confirmPassword) {
          stepErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
          stepErrors.confirmPassword = "Passwords do not match";
        }
        break;
      case 4:
        if (!formData.cardNumber)
          stepErrors.cardNumber = "Card number is required";
        if (!formData.expiryDate)
          stepErrors.expiryDate = "Expiry date is required";
        if (!formData.cvv) stepErrors.cvv = "CVV is required";
        break;
      default:
        break;
    }
    return stepErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep(activeStep);
    if (Object.keys(stepErrors).length === 0) {
      setActiveStep((prev) => Math.min(prev + 1, 4));
    } else {
      setErrors(stepErrors);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateStep(activeStep);
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Form submitted:", formData);
        // Reset form or show success message
        navigate("/admin-login");
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const Feature = ({ feature, index }) => (
    <div
      className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <h3 className="text-xl font-semibold text-indigo-600 mb-3">
        {feature.title}
      </h3>
      <p className="text-gray-600 mb-4">{feature.description}</p>
      <ul className="space-y-2">
        {feature.details.map((detail, idx) => (
          <li key={idx} className="flex items-center text-gray-700">
            <svg
              className="w-4 h-4 text-green-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <PageTitle title="Subscription Form" />
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Basic Plan Subscription
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to streamline your business
          </p>
          <div className="mt-6">
            <span className="text-5xl font-bold text-indigo-600">₹60</span>
            {/* <span className="text-gray-600">/month</span> */}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Feature key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Subscription Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.01] duration-300 max-w-lg mx-auto">
          <div className="px-8 py-6">
            <h2 className="text-2xl font-bold text-center mb-6">
              Get Started Today
            </h2>

            {/* Progress Indicators */}
            <div className="flex justify-center space-x-4 mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step === activeStep
                      ? "bg-indigo-600 text-white scale-110"
                      : step < activeStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>

            {/* Form Steps */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Information */}
              <div
                className={`transition-all duration-500 transform ${
                  activeStep === 1
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0 hidden"
                }`}
              >
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.username ? "border-red-500" : "border-gray-300"
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                    />
                    {errors.username && (
                      <p className="text-sm text-red-500">{errors.username}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 2: Contact Information */}
              <div
                className={`transition-all duration-500 transform ${
                  activeStep === 2
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0 hidden"
                }`}
              >
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                    />
                    {errors.address && (
                      <p className="text-sm text-red-500">{errors.address}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 3: Password */}
              <div
                className={`transition-all duration-500 transform ${
                  activeStep === 3
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0 hidden"
                }`}
              >
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    Password must contain:
                    <ul className="list-disc pl-5 mt-1">
                      <li>At least 8 characters</li>
                      <li>Uppercase & lowercase letters</li>
                      <li>Numbers</li>
                      <li>Special characters</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 4: Payment Information */}
              <div
                className={`transition-all duration-500 transform ${
                  activeStep === 4
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0 hidden"
                }`}
              >
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Card Number
                    </label>
                    <input
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border ${
                        errors.cardNumber ? "border-red-500" : "border-gray-300"
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                    />
                    {errors.cardNumber && (
                      <p className="text-sm text-red-500">
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expiry Date
                      </label>
                      <input
                        id="expiryDate"
                        name="expiryDate"
                        type="text"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border ${
                          errors.expiryDate
                            ? "border-red-500"
                            : "border-gray-300"
                        } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                      />
                      {errors.expiryDate && (
                        <p className="text-sm text-red-500">
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-medium text-gray-700"
                      >
                        CVV
                      </label>
                      <input
                        id="cvv"
                        name="cvv"
                        type="text"
                        value={formData.cvv}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border ${
                          errors.cvv ? "border-red-500" : "border-gray-300"
                        } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                      />
                      {errors.cvv && (
                        <p className="text-sm text-red-500">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                {activeStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-2 border-2 border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                )}
                {activeStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="ml-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Subscribe Now"
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;
