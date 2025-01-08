import React, { useState, useEffect } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import PageTitle from '../../components/PageTitle';

function Contact() {
  const [bgColor, setBgColor] = useState("from-green-400 to-teal-500");
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  const colors = [
    "from-green-400 to-teal-500",
    "from-teal-400 to-cyan-500",
    "from-cyan-400 to-blue-500"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setBgColor(prevColor => colors[(colors.indexOf(prevColor) + 1) % colors.length]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/invenquity/contact/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Your message is received, and soon someone from our side will contact you!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen">
      <PageTitle title="InvenQuity | Contact" />
      <section className={`relative bg-gradient-to-r ${bgColor} transition-all duration-1000 p-8`}>
        <div className="max-w-6xl mx-auto pt-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center text-white font-bold mb-16">
              <h1 className="text-6xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl max-w-2xl mx-auto">
                Have questions? We're here to help and would love to hear from you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-bold mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-black placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white font-bold mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-black placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-bold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-black placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-bold mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-black placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-bold mb-2">Message</label>
                    <textarea
                      rows="5"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-black placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-opacity-90 transition duration-300"
                  >
                    Send Message
                    <Send size={20} />
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl">
                  <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-white">
                      <Phone className="h-6 w-6" />
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p>+91 8340774684</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-white">
                      <Mail className="h-6 w-6" />
                      <div>
                        <p className="font-semibold">Email</p>
                        <p>support@invenquity.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-white">
                      <MapPin className="h-6 w-6" />
                      <div>
                        <p className="font-semibold">Address</p>
                        <p>123 Business Ave, Tech City, Bengaluru 560100</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
