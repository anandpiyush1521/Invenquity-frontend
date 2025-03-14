import React, { useState } from "react";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    const templateParams = {
      user_email: email,
      admin_email: "nishasingh1772003@gmail.com",
    };

    emailjs.send("service_yn2trnh", "template_qwszygd", templateParams, "zv0PwAA6qtkK_OFba")
      .then(() => {
        setMessage("Subscription successful! A confirmation email has been sent.");
        setEmail("");
        toast.success("Subscription successful! A confirmation email has been sent.");
      })
      .catch(() => {
        setMessage("Failed to subscribe. Please try again later.");
        toast.error("Failed to subscribe. Please try again later.");
      });

    // Send email to admin
    emailjs.send("service_yn2trnh", "template_qwszygd", { ...templateParams, user_email: "nishasingh1772003@gmail.com" }, "zv0PwAA6qtkK_OFba")
      .then(() => {
        console.log("Admin notification sent.");
      })
      .catch(() => {
        console.error("Failed to send admin notification.");
      });
  };
  return (
    <footer className=" text-black p-10">
      <ToastContainer />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div className="flex flex-col space-y-4">
          <a href="/" className="text-3xl font-bold tracking-wide">
            Inven
            <span className="text-indigo-500 font-extrabold">
              <u>Quity</u>
            </span>
          </a>
          <p className="text-gray-800 text-sm">
            Innovating the future, one step at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-8 justify-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2 mt-2 text-gray-400">
              <li>
                <a
                  href="/about"
                  className="text-gray-800 hover:text-indigo-500 transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-800 hover:text-indigo-500 transition"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2 mt-2 text-gray-400">
              <li>
                <a
                  href="/faq"
                  className="text-gray-800 hover:text-indigo-500 transition"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/help-center"
                  className="text-gray-800 hover:text-indigo-500 transition"
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold">Subscribe</h3>
          <p className="text-gray-800 text-sm mt-2">
            Stay updated with our latest news.
          </p>
          <form onSubmit={handleSubscribe} className="mt-3 flex">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 text-black border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:ring-2 outline-none w-full"
              required
            />
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-r-md text-white font-semibold"
            >
              Subscribe
            </button>
          </form>
          {message && <p className="text-sm mt-2 text-gray-600">{message}</p>}
        </div>
      </div>

      {/* Social Links & Copyright */}
      <div className="mt-10 flex flex-col md:flex-row items-center justify-between border-t border-gray-700 pt-6">
        <p className="text-gray-500 text-sm">
          © 2024 InvenQuity. All rights reserved.
        </p>
        <div className="flex space-x-5 mt-4 md:mt-0">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500 transition"
          >
            <Github size={20} />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500 transition"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500 transition"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:support@invenquity.com"
            className="hover:text-indigo-500 transition"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
