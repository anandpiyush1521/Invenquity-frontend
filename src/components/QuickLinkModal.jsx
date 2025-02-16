import React, { useEffect, useState } from 'react';
import { X, Loader2, SendHorizontal, AlertCircle } from 'lucide-react';

// Enhanced Modal Component with animation
const Modal = ({ isOpen, onClose, children, title, description }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      setIsAnimating(true);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={onClose}
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className={`relative w-full max-w-lg bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            {description && (
              <p className="mt-2 text-sm text-gray-600">{description}</p>
            )}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

const QuickLinkModal = ({ isOpen, onClose, activeLink }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'Low',
    name: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (type) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitStatus('success');
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        subject: '',
        description: '',
        priority: 'Low',
        name: '',
        message: ''
      });
      setSubmitStatus(null);
      onClose();
    }, 1500);
  };

  const modalContent = {
    "Submit a Ticket": {
      title: "Submit a Support Ticket",
      description: "Tell us about your issue and we'll get back to you as soon as possible.",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Brief description of your issue"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none"
              placeholder="Please provide details about your issue..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>
          <button
            onClick={() => handleSubmit('ticket')}
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : submitStatus === 'success' ? (
              <>
                <span>Ticket Submitted!</span>
              </>
            ) : (
              <>
                <SendHorizontal className="h-4 w-4" />
                <span>Submit Ticket</span>
              </>
            )}
          </button>
        </div>
      )
    },
    "Live Chat": {
      title: "Live Chat Support",
      description: "Connect with our support team in real-time.",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-gray-600">Our chat representatives are available to assist you.</p>
            </div>
            <p className="font-medium text-gray-800 mt-2">Current wait time: ~5 minutes</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Initial Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-24 resize-none"
              placeholder="How can we help you today?"
            />
          </div>
          <button
            onClick={() => handleSubmit('chat')}
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Connecting...</span>
              </>
            ) : submitStatus === 'success' ? (
              <>
                <span>Connected!</span>
              </>
            ) : (
              <>
                <SendHorizontal className="h-4 w-4" />
                <span>Start Chat</span>
              </>
            )}
          </button>
        </div>
      )
    },
    "Support Hours": {
      title: "Support Hours & Contact Information",
      description: "Find the best time to reach our support team.",
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Regular Support Hours</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">Monday - Friday</p>
                <p className="text-gray-600">9:00 AM - 8:00 PM EST</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">Saturday</p>
                <p className="text-gray-600">10:00 AM - 6:00 PM EST</p>
              </div>
              <div className="col-span-2 p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">Sunday</p>
                <p className="text-gray-600">Closed</p>
              </div>
            </div>
          </div>
          <div className="space-y-2 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <h3 className="font-medium text-yellow-900">Emergency Support</h3>
            </div>
            <p className="text-yellow-800">24/7 emergency support available for critical issues.</p>
            <p className="text-yellow-800 font-medium">Emergency hotline: 1-800-555-0123</p>
          </div>
        </div>
      )
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalContent[activeLink]?.title}
      description={modalContent[activeLink]?.description}
    >
      {modalContent[activeLink]?.content}
    </Modal>
  );
};

export default QuickLinkModal;