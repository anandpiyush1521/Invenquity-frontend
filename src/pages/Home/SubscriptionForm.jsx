import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';

const SubscriptionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const features = [
    {
      title: "Advanced Inventory Management",
      description: "Real-time tracking with low stock alerts, batch tracking, and inventory forecasting",
      details: [
        "Automated stock level monitoring",
        "Predictive inventory analytics",
        "Custom stock level thresholds",
        "Inventory valuation reports"
      ]
    },
    {
      title: "Comprehensive Notification System",
      description: "Multi-channel alerts and communication system",
      details: [
        "Email notifications",
        "In-app alerts",
        "SMS notifications (optional)",
        "Custom notification templates"
      ]
    },
    {
      title: "Enhanced Security & Authentication",
      description: "Enterprise-grade security features",
      details: [
        "Two-factor authentication",
        "Role-based access control",
        "Session management",
        "Audit logging"
      ]
    },
    {
      title: "Analytics & Reporting",
      description: "Detailed insights and customizable reports",
      details: [
        "Real-time dashboard",
        "Customizable reports",
        "Export functionality",
        "Data visualization"
      ]
    },
    {
      title: "Integration & API Access",
      description: "Seamless connectivity with your existing tools",
      details: [
        "RESTful API access",
        "Webhook support",
        "Third-party integrations",
        "API documentation"
      ]
    }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateStep = (step) => {
    let stepErrors = {};
    switch (step) {
      case 1:
        if (!formData.firstName) stepErrors.firstName = 'First name is required';
        if (!formData.lastName) stepErrors.lastName = 'Last name is required';
        if (!formData.username) stepErrors.username = 'Username is required';
        break;
      case 2:
        if (!formData.email) {
          stepErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
          stepErrors.email = 'Invalid email format';
        }
        if (!formData.phone) {
          stepErrors.phone = 'Phone is required';
        } else if (!validatePhone(formData.phone)) {
          stepErrors.phone = 'Invalid phone format';
        }
        if (!formData.address) stepErrors.address = 'Address is required';
        break;
      case 3:
        if (!formData.password) {
          stepErrors.password = 'Password is required';
        } else if (!validatePassword(formData.password)) {
          stepErrors.password = 'Password must meet all requirements';
        }
        if (!formData.confirmPassword) {
          stepErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
          stepErrors.confirmPassword = 'Passwords do not match';
        }
        break;
      case 4:
        if (!formData.cardNumber) stepErrors.cardNumber = 'Card number is required';
        if (!formData.expiryDate) stepErrors.expiryDate = 'Expiry date is required';
        if (!formData.cvv) stepErrors.cvv = 'CVV is required';
        break;
      default:
        break;
    }
    return stepErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep(activeStep);
    if (Object.keys(stepErrors).length === 0) {
      setActiveStep(prev => Math.min(prev + 1, 4));
    } else {
      setErrors(stepErrors);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateStep(activeStep);
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Form submitted:', formData);
        // Reset form or show success message
        navigate("/admin-login");
      } catch (error) {
        console.error('Submission error:', error);
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

  const InputField = ({ name, label, type = "text", value, error, isPassword = false }) => (
    <div className="relative">
      <input
        type={isPassword ? (name === 'password' ? (showPassword ? 'text' : 'password') : (showConfirmPassword ? 'text' : 'password')) : type}
        name={name}
        value={value}
        onChange={handleInputChange}
        className="peer w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors placeholder-transparent"
        placeholder={label}
      />
      <label className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm">
        {label}
      </label>
      {isPassword && (
        <button
          type="button"
          onClick={() => name === 'password' ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-4 top-3 text-gray-500 hover:text-gray-700"
        >
          {name === 'password' ? (showPassword ? '🙈' : '👁️') : (showConfirmPassword ? '🙈' : '👁️')}
        </button>
      )}
      {error && <span className="text-red-500 text-sm mt-1 animate-shake">{error}</span>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <PageTitle title="Subscription Form" />
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Basic Plan Subscription</h1>
          <p className="text-xl text-gray-600">Everything you need to streamline your business</p>
          <div className="mt-6">
            <span className="text-5xl font-bold text-indigo-600">$10</span>
            <span className="text-gray-600">/month</span>
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
            <h2 className="text-2xl font-bold text-center mb-6">Get Started Today</h2>
            
            {/* Progress Indicators */}
            <div className="flex justify-center space-x-4 mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step === activeStep
                      ? 'bg-indigo-600 text-white scale-110'
                      : step < activeStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>

            {/* Form Steps */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Information */}
              <div className={`transition-all duration-500 transform ${activeStep === 1 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 hidden'}`}>
                <div className="space-y-4">
                  <InputField name="firstName" label="First Name" value={formData.firstName} error={errors.firstName} />
                  <InputField name="lastName" label="Last Name" value={formData.lastName} error={errors.lastName} />
                  <InputField name="username" label="Username" value={formData.username} error={errors.username} />
                </div>
              </div>

              {/* Step 2: Contact Information */}
              <div className={`transition-all duration-500 transform ${activeStep === 2 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 hidden'}`}>
                <div className="space-y-4">
                  <InputField name="email" label="Email" type="email" value={formData.email} error={errors.email} />
                  <InputField name="phone" label="Phone" value={formData.phone} error={errors.phone} />
                  <InputField name="address" label="Address" value={formData.address} error={errors.address} />
                </div>
              </div>

              {/* Step 3: Password */}
              <div className={`transition-all duration-500 transform ${activeStep === 3 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 hidden'}`}>
                <div className="space-y-4">
                  <InputField name="password" label="Password" value={formData.password} error={errors.password} isPassword={true} />
                  <InputField name="confirmPassword" label="Confirm Password" value={formData.confirmPassword} error={errors.confirmPassword} isPassword={true} />
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
              <div className={`transition-all duration-500 transform ${activeStep === 4 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 hidden'}`}>
                <div className="space-y-4">
                  <InputField name="cardNumber" label="Card Number" value={formData.cardNumber} error={errors.cardNumber} />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField name="expiryDate" label="Expiry Date" placeholder="MM/YY" value={formData.expiryDate} error={errors.expiryDate} />
                    <InputField name="cvv" label="CVV" value={formData.cvv} error={errors.cvv} />
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
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Subscribe Now'
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