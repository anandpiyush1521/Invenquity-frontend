import React from "react";

function Navbar() {
  return (
    <div>
      <nav className="flex items-center justify-between p-5 shadow-md">
        <div className="text-2xl font-bold">
          <span className="text-black">Inven</span>
          <span className="text-indigo-600 font-extrabold"><u>Quity</u></span>
        </div>
        <div>
          <button className="bg-black text-white px-4 py-2 rounded-md mr-2">
            Admin
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-md">
            Login
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
