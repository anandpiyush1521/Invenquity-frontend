import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import PageTitle from '../../components/PageTitle';

function Contact() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

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
      <section>
        <div className="max-w-6xl mx-auto pt-16">
          <div>
            <div className="text-center text-indigo-900 font-bold mb-16">
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
                      <label className="block text-green-900 font-bold mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-black/30 text-black placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-green-900 font-bold mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-black/30 text-black placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-green-900 font-bold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-black/30 text-black placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-green-900 font-bold mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-black/30 text-black placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-green-900 font-bold mb-2">Message</label>
                    <textarea
                      rows="5"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-black/30 text-black placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-opacity-90 transition duration-300"
                  >
                    Send Message
                    <Send size={20} />
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl">
                  <h2 className="text-2xl font-bold text-indigo-800 mb-6">Get in Touch</h2>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-gray-900">
                      <Phone className="h-6 w-6" />
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p>+91 8340774684</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-gray-900">
                      <Mail className="h-6 w-6" />
                      <div>
                        <p className="font-semibold">Email</p>
                        <p>support@invenquity.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-gray-900">
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
