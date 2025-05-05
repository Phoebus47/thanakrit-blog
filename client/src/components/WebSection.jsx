import React, { useState, useEffect } from "react";
import { MenuRounded, LinkedIn, GitHub, Google } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

//Navbar
export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate?.() ?? (() => {});

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="w-full bg-slate-950/70 border-b border-neon-blue shadow-[0_0_24px_2px_#00fff7] z-50 mb-8 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center p-6">
        {/* Logo */}
        <div>
          <h1
            className="text-3xl md:text-4xl font-orbitron font-extrabold bg-gradient-to-r from-neon-pink via-pink-500 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_#ff3ec9] animate-glow cursor-pointer select-none"
            style={{
              WebkitTextStroke: "1.5px #fff",
              letterSpacing: "0.06em",
              textShadow:
                "0 0 18px #ff3ec9, 0 0 32px #ffb3fa, 0 0 8px #ff3ec9, 0 0 2px #fff",
            }}
            onClick={() => navigate("/")}
          >
            TinCodeSpace<span className="text-neon-yellow"> .</span>
          </h1>
        </div>
        {/* Hamburger */}
        <button
          className="md:hidden text-neon-blue hover:text-neon-yellow transition duration-300"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <MenuRounded fontSize="large" />
        </button>
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-5">
          <button
            className="px-8 py-2 rounded-full bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-300 text-white font-orbitron font-semibold shadow-[0_0_8px_#ffe066] border border-orange-300/60 hover:from-yellow-400 hover:to-orange-400 hover:shadow-[0_0_16px_#ffe066] hover:text-black transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
          <button
            className="px-8 py-2 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 text-white font-orbitron font-semibold shadow-[0_0_8px_#ffe066] border border-yellow-300/60 hover:from-orange-400 hover:to-yellow-400 hover:shadow-[0_0_16px_#ffe066] hover:text-black transition-all duration-300"
            onClick={() => navigate("/sign-up")}
          >
            Sign up
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in-down bg-slate-950/95 border-t border-neon-blue shadow-[0_0_24px_2px_#00fff7] backdrop-blur-md">
          <div className="flex flex-col gap-4 p-6 pt-0">
            <button
              className="w-full px-6 py-4 rounded-full bg-gradient-to-r from-orange-400 via-yellow-400 to-yellow-300 text-white font-orbitron font-semibold shadow-[0_0_8px_#ffe066] border border-orange-300/60 hover:from-yellow-400 hover:to-orange-400 hover:shadow-[0_0_16px_#ffe066] hover:text-black transition-all duration-300"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/login");
              }}
            >
              Log in
            </button>
            <button
              className="w-full px-6 py-4 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 text-white font-orbitron font-semibold shadow-[0_0_8px_#ffe066] border border-yellow-300/60 hover:from-orange-400 hover:to-yellow-400 hover:shadow-[0_0_16px_#ffe066] hover:text-black transition-all duration-300"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/sign-up");
              }}
            >
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
      image: "/images/avartar.webp",
      author: {
        name: "Thanakrit T.",
        role: "-Author",
        bio: `A front-end developer and tech enthusiast with a passion for crafting sleek, high-performance user experiences. I specialize in modern web technologies, bringing futuristic aesthetics to life through clean, efficient code.`,
        extra: `When I'm not coding, you'll find me exploring the latest in cyberpunk design, experimenting with new UI trends, or immersing myself in the ever-evolving world of web development.`,
      },
    },
  ];

  useEffect(() => {
    document.title = "My Personal Blog - Tech & Cyberpunk UI";

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content =
      "Explore the world of modern web development, futuristic UI, and cyberpunk-inspired innovation.";
    document.head.appendChild(metaDescription);

    const ogImage = document.createElement("meta");
    ogImage.setAttribute("property", "og:image");
    ogImage.content = "/images/avartar.webp";
    document.head.appendChild(ogImage);

    const ogDescription = document.createElement("meta");
    ogDescription.setAttribute("property", "og:description");
    ogDescription.content =
      "Explore the world of modern web development, futuristic UI, and cyberpunk-inspired innovation.";
    document.head.appendChild(ogDescription);

    return () => {
      document.head.removeChild(metaDescription);
      document.head.removeChild(ogImage);
      document.head.removeChild(ogDescription);
    };
  }, []);

  return (
    <main className="container px-4 py-8 lg:py-16 mx-auto txt-shadow-neon-green">
      {/* Mobile Layout */}
      {sections.map((section, index) => (
        <div className={`flex flex-col lg:hidden items-center`} key={index}>
          <div className="mb-8">
            {/* Futuristic Neon Title */}
            <h1
              className="text-5xl font-orbitron font-extrabold text-center mb-4 bg-gradient-to-r from-neon-pink via-neon-blue to-neon-green bg-clip-text text-transparent drop-shadow-[0_0_16px_#00fff7] animate-glow"
              style={{
                WebkitTextStroke: "1.5px #fff",
                letterSpacing: "0.04em",
                textShadow:
                  "0 0 16px #00fff7, 0 0 32px #ff00ff, 0 0 8px #00ffea, 0 0 2px #fff",
              }}
            >
              {section.title.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h1>
            <p className="text-lg text-center mb-6 bg-gradient-to-r from-neon-yellow via-neon-orange to-neon-pink bg-clip-text text-transparent font-semibold txt-shadow-neon-yellow">
              {section.description}
            </p>
          </div>
          <div className="relative h-[400px] w-auto max-w-[400px] mb-8 flex items-center justify-center overflow-hidden rounded-lg">
            <img
              src={section.image}
              alt={section.author.name}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="relative w-full h-full object-cover fade-mask transition-opacity duration-700 drop-shadow-[0_0_2px_#00fff7]"
              onLoad={(e) => (e.target.style.opacity = 1)}
            />
          </div>
          <div>
            <div>
              <h2
                className="text-lg font-orbitron font-semibold mb-2 bg-gradient-to-r from-neon-yellow via-neon-orange to-neon-pink bg-clip-text text-transparent txt-shadow-neon-yellow uppercase tracking-widest"
                style={{
                  WebkitTextStroke: "0.5px #fff",
                  letterSpacing: "0.08em",
                  textShadow: "0 0 8px #ffe066, 0 0 16px #ff8800",
                }}
              >
                {section.author.role}
              </h2>
              <h3
                className="text-2xl font-orbitron font-bold mb-4 bg-gradient-to-r from-neon-blue via-neon-green to-neon-pink bg-clip-text text-transparent txt-shadow-neon-blue"
                style={{
                  WebkitTextStroke: "1px #fff",
                  letterSpacing: "0.04em",
                  textShadow: "0 0 12px #00fff7, 0 0 24px #00ffea",
                }}
              >
                {section.author.name}
              </h3>
              <p className="mb-4 text-base font-medium bg-gradient-to-r from-white via-neon-blue to-neon-green bg-clip-text text-transparent txt-shadow-neon-blue">
                {section.author.bio}
              </p>
              <p className="text-base font-medium bg-gradient-to-r from-neon-pink via-neon-yellow to-neon-green bg-clip-text text-transparent txt-shadow-neon-pink">
                {section.author.extra}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Desktop Layout */}
      {sections.map((section, index) => (
        <div className={`hidden lg:flex lg:flex-row items-center`} key={index}>
          <div className="w-1/3 pr-8">
            {/* Futuristic Neon Title */}
            <h1
              className="text-5xl font-orbitron font-extrabold text-right mb-4 bg-gradient-to-r from-neon-pink via-neon-blue to-neon-green bg-clip-text text-transparent drop-shadow-[0_0_16px_#00fff7] animate-glow"
              style={{
                WebkitTextStroke: "1.5px #fff",
                letterSpacing: "0.04em",
                textShadow:
                  "0 0 16px #00fff7, 0 0 32px #ff00ff, 0 0 8px #00ffea, 0 0 2px #fff",
              }}
            >
              {section.title.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h1>
            <p className="text-lg text-right mb-6 bg-gradient-to-r from-neon-yellow via-neon-orange to-neon-pink bg-clip-text text-transparent font-semibold txt-shadow-neon-yellow">
              {section.description}
            </p>
          </div>
          <div className="relative h-[400px] w-auto max-w-[400px] mb-8 flex items-center justify-center overflow-hidden rounded-lg">
            <img
              src={section.image}
              alt={section.author.name}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="relative w-full h-full object-cover fade-mask transition-opacity duration-700 opacity-0 drop-shadow-[0_0_2px_#00fff7]"
              onLoad={(e) => (e.target.style.opacity = 1)}
            />
          </div>
          <div className="w-1/3 pl-8">
            <div>
              <h2
                className="text-lg font-orbitron font-semibold mb-2 bg-gradient-to-r from-neon-yellow via-neon-orange to-neon-pink bg-clip-text text-transparent txt-shadow-neon-yellow uppercase tracking-widest"
                style={{
                  WebkitTextStroke: "0.5px #fff",
                  letterSpacing: "0.08em",
                  textShadow: "0 0 8px #ffe066, 0 0 16px #ff8800",
                }}
              >
                {section.author.role}
              </h2>
              <h3
                className="text-2xl font-orbitron font-bold mb-4 bg-gradient-to-r from-neon-blue via-neon-green to-neon-pink bg-clip-text text-transparent txt-shadow-neon-blue"
                style={{
                  WebkitTextStroke: "1px #fff",
                  letterSpacing: "0.04em",
                  textShadow: "0 0 12px #00fff7, 0 0 24px #00ffea",
                }}
              >
                {section.author.name}
              </h3>
              <p className="mb-4 text-base font-medium bg-gradient-to-r from-white via-neon-blue to-neon-green bg-clip-text text-transparent txt-shadow-neon-blue">
                {section.author.bio}
              </p>
              <p className="text-base font-medium bg-gradient-to-r from-neon-pink via-neon-yellow to-neon-green bg-clip-text text-transparent txt-shadow-neon-pink">
                {section.author.extra}
              </p>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}

//Footer
export const Footer = () => {
  return (
    <footer className="relative overflow-hidden p-0 mt-8">
      {/* Neon Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#2d0036] via-[#1a0a2e] to-[#0e1b2b] opacity-95" />
      {/* Glow ring */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[600px] h-[120px] bg-gradient-radial from-fuchsia-500/40 via-transparent to-transparent blur-3xl opacity-70 z-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Contact & Social */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-slate-950/70 border border-fuchsia-500 shadow-[0_0_32px_4px_#ff3ec9] p-6 md:p-8 rounded-2xl w-full md:w-auto">
          <p className="text-xl font-bold font-orbitron bg-gradient-to-r from-fuchsia-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_#ff3ec9]">
            Get in Touch
          </p>
          <div className="flex gap-5">
            <a
              href="https://www.linkedin.com/in/thanakrit-thanyawatsakul/"
              className="group transition"
              aria-label="LinkedIn Profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-500 via-pink-400 to-blue-400 shadow-[0_0_16px_#ff3ec9] group-hover:scale-110 group-hover:shadow-[0_0_32px_#ffe066] transition">
                <LinkedIn
                  fontSize="large"
                  className="text-white drop-shadow-[0_0_8px_#ff3ec9]"
                />
              </span>
            </a>
            <a
              href="https://github.com/Phoebus47"
              className="group transition"
              aria-label="GitHub Profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 via-fuchsia-500 to-pink-400 shadow-[0_0_16px_#00fff7] group-hover:scale-110 group-hover:shadow-[0_0_32px_#ff3ec9] transition">
                <GitHub
                  fontSize="large"
                  className="text-white drop-shadow-[0_0_8px_#00fff7]"
                />
              </span>
            </a>
            <a
              href="mailto:thanakrit.than.biz@gmail.com"
              className="group transition"
              aria-label="Email"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 via-fuchsia-500 to-blue-400 shadow-[0_0_16px_#ffe066] group-hover:scale-110 group-hover:shadow-[0_0_32px_#ffe066] transition">
                <Google
                  fontSize="large"
                  className="text-white drop-shadow-[0_0_8px_#ffe066]"
                />
              </span>
            </a>
          </div>
        </div>
        {/* Home & Copyright */}
        <div className="flex flex-col items-center">
          <Link
            to="/"
            className="underline font-orbitron font-semibold text-lg bg-gradient-to-r from-yellow-300 via-pink-400 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_#ffe066] hover:text-white transition"
          >
            Home Page
          </Link>
          <p className="text-center text-fuchsia-200/80 text-sm pt-2 font-orbitron drop-shadow-[0_0_6px_#ff3ec9]">
            © 2025 Thanakrit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
