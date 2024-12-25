import React from "react";

function Footer() {
  return (
    <footer className="p-5 bg-white text-black">
      <div className="flex flex-col lg:flex-row justify-between items-center border-t-2 pt-5">
        {/* Left Side: Logo */}
        <div className="mb-5 lg:mb-0">
          <a href="/" className="text-2xl font-bold">
            <span>Inven</span>
            <span className="text-indigo-600 font-extrabold">
              <u>Quity</u>
            </span>
          </a>
        </div>

        {/* Right Side: Columns */}
        <div className="flex justify-around space-x-10">
          {/* Column 1 */}
          <div className="text-center">
            <p className="font-bold mb-2">Company</p>
            <ul>
              <li>
                <a href="/about" className="hover:text-indigo-600 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-indigo-600 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="text-center">
            <p className="font-bold mb-2">Connect</p>
            <ul>
              <li>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 transition flex items-center justify-center"
                >
                  <span className="material-icons mr-1">code</span> GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@invenquity.com"
                  className="hover:text-indigo-600 transition"
                >
                  support@invenquity.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom: Copyright */}
      <div className="mt-5 text-center  pt-5">
        <p>InvenQuity © 2024</p>
      </div>
    </footer>
  );
}

export default Footer;