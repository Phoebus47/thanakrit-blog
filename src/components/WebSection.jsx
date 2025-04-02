import React, { useState, useEffect } from "react";
import { MenuRounded, LinkedIn, GitHub, Google } from "@mui/icons-material";
import { Link } from "react-router-dom";

//Navbar
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full">
      <nav className="max-w-10/12 mx-auto flex justify-between items-center p-6">
        <div>
          <h1 className="text-3xl font-semibold text-neon-pink txt-shadow-neon-pink">
            TinCodeSpace<span className="text-neon-pink"> .</span>
          </h1>
        </div>
        <button
          className="md:hidden text-neon-pink hover:text-gray-300 transition duration-300"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <MenuRounded />
        </button>
        <div className="hidden md:flex gap-5">
          <button className="px-8 py-2 rounded-full border border-neon-pink inset-ring text-neon-pink hover:shadow-neon-pink txt-shadow-neon-pink transition duration-300">
            Log in
          </button>
          <button className="px-8 py-2 rounded-full border border-neon-pink inset-ring text-neon-pink hover:shadow-neon-pink txt-shadow-neon-pink transition duration-300">
            Sign up
          </button>
        </div>
      </nav>
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

//Hero
export function HeroSection() {
  const sections = [
    {
      title: "Code the \nFuture, \nShape the Web",
      description:
        "Explore the world of modern web development, futuristic UI, and cyberpunk-inspired innovation.",
      image: "https://i.imgur.com/2uO8uEZ.jpg",
      author: {
        name: "Thanakrit T.",
        role: "-Author",
        bio: `A front-end developer and tech enthusiast with a passion for crafting sleek, high-performance user experiences. I specialize in modern web technologies, bringing futuristic aesthetics to life through clean, efficient code.`,
        extra: `When I'm not coding, you'll find me exploring the latest in cyberpunk design, experimenting with new UI trends, or immersing myself in the ever-evolving world of web development.`,
      },
    },
  ];

  // ตั้งค่า cookies ใน useEffect
  useEffect(() => {
    // กำหนดค่า cookie ใน document
    document.cookie =
      "yourCookie=value; path=/; domain=example.com; Secure; SameSite=None";
  }, []);

  return (
    <main className="container px-4 py-8 lg:py-16 mx-auto txt-shadow-neon-green">
      {/* Mobile Layout */}
      {sections.map((section, index) => (
        <div className={`flex flex-col lg:hidden items-center`} key={index}>
          <div className="mb-8">
            <h1 className="text-5xl font-semibold mb-4 text-center text-neon-green">
              {section.title.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h1>
            <p className="text-lg text-white text-center">
              {section.description}
            </p>
          </div>
          <div className="h-[400px] w-auto max-w-[400px] mb-8 flex items-center justify-center">
            <img
              src={section.image}
              alt={section.author.name}
              loading="lazy"
              className="w-full h-full object-cover rounded-lg fade-mask"
              onLoad={(e) => (e.target.style.opacity = 1)}
              style={{ opacity: 0, transition: "opacity 0.5s ease-in-out" }}
              crossOrigin="anonymous"
            />
          </div>
          <div>
            <h2 className="text-white text-l font-light mb-2">
              {section.author.role}
            </h2>
            <h3 className="text-2xl font-semibold mb-4 text-neon-blue txt-shadow-neon-blue">
              {section.author.name}
            </h3>
            <p className="text-white mb-4">{section.author.bio}</p>
            <p className="text-white">{section.author.extra}</p>
          </div>
        </div>
      ))}

      {/* Desktop Layout */}
      {sections.map((section, index) => (
        <div className={`hidden lg:flex lg:flex-row items-center`} key={index}>
          <div className="w-1/3 pr-8">
            <h1 className="text-5xl font-semibold mb-4 text-right text-neon-green">
              {section.title.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h1>
            <p className="text-lg text-white text-right">
              {section.description}
            </p>
          </div>
          <div className="h-[400px] w-[400px] max-w-[400px] mb-8 flex items-center justify-center">
            <img
              src={section.image}
              alt={section.author.name}
              loading="lazy"
              className="w-full h-full object-cover rounded-lg fade-mask"
              onLoad={(e) => (e.target.style.opacity = 1)}
              style={{ opacity: 0, transition: "opacity 0.5s ease-in-out" }}
            />
          </div>
          <div className="w-1/3 pl-8">
            <h2 className="text-white text-l font-light mb-2">
              {section.author.role}
            </h2>
            <h3 className="text-2xl font-semibold mb-4 text-neon-blue txt-shadow-neon-blue">
              {section.author.name}
            </h3>
            <p className="text-white mb-4">{section.author.bio}</p>
            <p className="text-white">{section.author.extra}</p>
          </div>
        </div>
      ))}
    </main>
  );
}

//Footer
export const Footer = () => {
  return (
    <footer className="text-neon-purple txt-shadow-neon-purple p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 max-w-10/12 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 border border-neon-purple inset-ring-neon-purple shadow-neon-purple p-6 md:p-8 rounded-lg w-11/12 md:w-auto">
          <p className="text-lg font-semibold">Get in Touch</p>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/thanakrit-thanyawatsakul/"
              className="hover:text-gray-300 transition"
            >
              <LinkedIn fontSize="large" />
            </a>
            <a
              href="https://github.com/Phoebus47"
              className="hover:text-gray-300 transition"
            >
              <GitHub fontSize="large" />
            </a>
            <a
              href="mailto:thanakrit.than.biz@gmail.com"
              className="hover:text-gray-300 transition"
            >
              <Google fontSize="large" />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Link to="/" className="underline hover:text-gray-300 transition">
            Home Page
          </Link>
          <p className="text-center text-gray-500 text-sm pt-2">
            © 2025 Thanakrit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
