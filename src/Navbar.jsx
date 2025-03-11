import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full border-b border-gray-200">
      {/* Desktop Navbar */}
      <nav className="max-w-10/12 mx-auto flex justify-between items-center p-6">
        <div className="text-3xl font-semibold text-gray-800">
          hh<span className="text-green-500">.</span>
        </div>

        {/* Hamburger Menu Button (visible on mobile) */}
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Menu (hidden on mobile) */}
        <div className="hidden md:flex gap-2">
          <button className="px-8 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition duration-300">
            Log in
          </button>
          <button className="px-8 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition duration-300">
            Sign up
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in-down">
          <div className="flex flex-col gap-4 p-6 pt-0 bg-gray-50">
            <button className="w-full px-6 py-4 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition duration-300">
              Log in
            </button>
            <button className="w-full px-6 py-4 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition duration-300">
              Sign up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
