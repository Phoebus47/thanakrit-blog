import React, { useState } from "react";
import { MenuRounded } from "@mui/icons-material";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full">
      {/* Desktop Navbar */}
      <nav className="max-w-10/12 mx-auto flex justify-between items-center p-6">
        <div>
          <h1 className="text-3xl font-semibold text-neon-pink txt-shadow-neon-pink">
            TinCodeSpace
            <span className="text-neon-pink"> .</span>
          </h1>
        </div>

        {/* Hamburger Menu Button (visible on mobile) */}
        <button
          className="md:hidden text-neon-pink hover:text-gray-300 transition duration-300"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <MenuRounded />
        </button>

        {/* Desktop Menu (hidden on mobile) */}
        <div className="hidden md:flex gap-5">
          <button className="px-8 py-2 rounded-full border border-neon-pink inset-ring text-neon-pink hover:shadow-neon-pink txt-shadow-neon-pink transition duration-300">
            Log in
          </button>
          <button className="px-8 py-2 rounded-full border border-neon-pink inset-ring text-neon-pink hover:shadow-neon-pink txt-shadow-neon-pink transition duration-300">
            Sign up
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in-down">
          <div className="flex flex-col gap-4 p-6 pt-0 bg-none">
            <button className="w-full px-6 py-4 rounded-full border border-neon-pink inset-ring text-neon-pink hover:shadow-neon-pink txt-shadow-neon-pink transition duration-300">
              Log in
            </button>
            <button className="w-full px-6 py-4 rounded-full border border-neon-pink inset-ring text-neon-pink hover:shadow-neon-pink txt-shadow-neon-pink transition duration-300">
              Sign up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
