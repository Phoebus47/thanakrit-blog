import React, { useState, useEffect } from "react";
import { MenuRounded, LinkedIn, GitHub, Google } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, User, Settings, LogOut, Bell, Search } from "lucide-react";
import { useAuth } from "../contexts/authentication";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate?.() ?? (() => {});

  const { isAuthenticated, state, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  // ฟังก์ชันสำหรับแปลงชื่อเป็น "Firstname L."
  const formatDisplayName = (fullName: string) => {
    if (!fullName) return "User";

    const nameParts = fullName.trim().split(" ");
    if (nameParts.length === 1) {
      return nameParts[0]; // ถ้ามีแค่ชื่อเดียว
    }

    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    const lastNameInitial = lastName?.charAt(0).toUpperCase() || "";

    return `${firstName} ${lastNameInitial}.`;
  };

  // Guest Navbar (อันเดิม)
  const GuestNavbar = () => (
    <div className="w-full bg-slate-950/70 border-b border-neon-blue shadow-[0_0_24px_2px_#00fff7] z-50 backdrop-blur-md">
      <nav className="flex justify-between items-center p-6">
        {/* Logo */}
        <div className="px-2 lg:px-6 py-1">
          <h1
            className="text-2xl md:text-3xl lg:text-4xl md:whitespace-break-spaces text-left font-orbitron font-extrabold bg-gradient-to-r from-neon-pink via-pink-500 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_#ff3ec9] animate-glow cursor-pointer select-none"
            style={{
              WebkitTextStroke: "1.5px #fff",
              letterSpacing: "0.06em",
              textShadow:
                "0 0 18px #ff3ec9, 0 0 32px #ffb3fa, 0 0 8px #ff3ec9, 0 0 2px #fff",
            }}
            onClick={() => navigate("/")}
          >
            Thanakrit Blog .
          </h1>
        </div>
        {/* Hamburger */}
        <button
          className="lg:hidden text-neon-blue hover:text-neon-yellow rounded-lg hover:bg-slate-800/50 transition duration-300 p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <MenuRounded
            fontSize="large"
            style={{
              color: "#ff3ec9",
              filter: `
                      drop-shadow(0 0 18px #ff3ec9) 
                      drop-shadow(0 0 32px #ffb3fa) 
                      drop-shadow(0 0 8px #ff3ec9) 
                      drop-shadow(0 0 2px #fff)
                    `,
              stroke: "#fff",
              strokeWidth: "1px",
              letterSpacing: "0.06em",
            }}
            className="animate-glow cursor-pointer"
          />
        </button>
        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-2">
          <div className="rounded-lg hover:bg-slate-800/50 transition-colors duration-100">
            <button
              className="px-6 py-3 font-orbitron font-semibold cursor-pointer bg-gradient-to-r from-neon-yellow via-neon-orange to-neon-pink bg-clip-text text-transparent hover:from-neon-orange hover:via-neon-yellow hover:to-neon-pink transition-all duration-300 uppercase tracking-widest"
              style={{
                WebkitTextStroke: "0.5px #fff",
                letterSpacing: "0.08em",
                textShadow: "0 0 8px #ffe066, 0 0 16px #ff8800",
              }}
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </div>
          <div className="rounded-lg hover:bg-slate-800/50 transition-colors duration-100">
            <button
              className="px-6 py-3 font-orbitron font-semibold cursor-pointer bg-gradient-to-r from-neon-yellow via-neon-orange to-neon-pink bg-clip-text text-transparent hover:from-neon-orange hover:via-neon-yellow hover:to-neon-pink transition-all duration-300 uppercase tracking-widest"
              style={{
                WebkitTextStroke: "0.5px #fff",
                letterSpacing: "0.08em",
                textShadow: "0 0 8px #ffe066, 0 0 16px #ff8800",
              }}
              onClick={() => navigate("/sign-up")}
            >
              Sign up
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden animate-fade-in-down bg-slate-950/95 border-t border-neon-blue shadow-[0_0_24px_2px_#00fff7] backdrop-blur-md">
          <div className="flex flex-col gap-4 p-6 pt-6 bg-gradient-to-b from-slate-900/80 via-fuchsia-900/40 to-blue-900/30">
            <div className="rounded-lg hover:bg-slate-800/50 transition-colors duration-100">
              <button
                className="w-full py-3 font-orbitron font-semibold cursor-pointer bg-gradient-to-r from-neon-yellow via-neon-orange to-neon-pink bg-clip-text text-transparent hover:from-neon-orange hover:via-neon-yellow hover:to-neon-pink transition-all duration-300 uppercase tracking-widest"
                style={{
                  WebkitTextStroke: "0.5px #fff",
                  letterSpacing: "0.08em",
                  textShadow: "0 0 8px #ffe066, 0 0 16px #ff8800",
                }}
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/login");
                }}
              >
                Log in
              </button>
            </div>
            <div className="rounded-lg hover:bg-slate-800/50 transition-colors duration-100">
              <button
                className="w-full py-3 font-orbitron font-semibold cursor-pointer bg-gradient-to-r from-neon-yellow via-neon-orange to-neon-pink bg-clip-text text-transparent hover:from-neon-orange hover:via-neon-yellow hover:to-neon-pink transition-all duration-300 uppercase tracking-widest"
                style={{
                  WebkitTextStroke: "0.5px #fff",
                  letterSpacing: "0.08em",
                  textShadow: "0 0 8px #ffe066, 0 0 16px #ff8800",
                }}
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/sign-up");
                }}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // User Navbar (หลัง Login)
  const UserNavbar = () => (
    <div className="w-full bg-slate-950/70 border-b border-neon-blue shadow-[0_0_24px_2px_#00fff7] z-50 mb-8 backdrop-blur-md">
      <nav className="flex justify-between items-center py-6 px-10">
        {/* Logo */}
        <div className="px-2 lg:px-6 py-1">
          <h1
            className="text-2xl md:text-3xl lg:text-4xl whitespace-nowrap text-left font-orbitron font-extrabold bg-gradient-to-r from-neon-pink via-pink-500 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_#ff3ec9] animate-glow cursor-pointer select-none"
            style={{
              WebkitTextStroke: "1.5px #fff",
              letterSpacing: "0.06em",
              textShadow:
                "0 0 18px #ff3ec9, 0 0 32px #ffb3fa, 0 0 8px #ff3ec9, 0 0 2px #fff",
            }}
            onClick={() => navigate("/")}
          >
            Thanakrit Blog .
          </h1>
        </div>

        {/* Desktop Menu for Logged User */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Navigation Links - เฉพาะ 3 ปุ่มนี้ใช้สี author.role */}
          <div className="flex gap-2">
            <div className="rounded-lg hover:bg-slate-800/50 transition-colors duration-100">
              <button
                className="p-3 font-orbitron font-semibold cursor-pointer bg-gradient-to-r from-neon-yellow via-neon-orange to-neon-pink bg-clip-text text-transparent hover:from-neon-orange hover:via-neon-yellow hover:to-neon-pink transition-all duration-300 uppercase tracking-widest"
                style={{
                  WebkitTextStroke: "0.5px #fff",
                  letterSpacing: "0.08em",
                  textShadow: "0 0 8px #ffe066, 0 0 16px #ff8800",
                }}
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>
            </div>
            <div className="rounded-lg hover:bg-slate-800/50 transition-colors duration-100">
              <button
                className="p-3 font-orbitron font-semibold cursor-pointer bg-gradient-to-r from-neon-yellow via-neon-orange to-neon-pink bg-clip-text text-transparent hover:from-neon-orange hover:via-neon-yellow hover:to-neon-pink transition-all duration-300 uppercase tracking-widest"
                style={{
                  WebkitTextStroke: "0.5px #fff",
                  letterSpacing: "0.08em",
                  textShadow: "0 0 8px #ffe066, 0 0 16px #ff8800",
                }}
                onClick={() => navigate("/my-posts")}
              >
                My Posts
              </button>
            </div>
            <div className="rounded-lg hover:bg-slate-800/50 transition-colors duration-100">
              <button
                className="p-3 font-orbitron font-semibold cursor-pointer bg-gradient-to-r from-neon-yellow via-neon-orange to-neon-pink bg-clip-text text-transparent hover:from-neon-orange hover:via-neon-yellow hover:to-neon-pink transition-all duration-300 uppercase tracking-widest"
                style={{
                  WebkitTextStroke: "0.5px #fff",
                  letterSpacing: "0.08em",
                  textShadow: "0 0 8px #ffe066, 0 0 16px #ff8800",
                }}
                onClick={() => navigate("/create-post")}
              >
                Create Post
              </button>
            </div>
          </div>

          {/* User Actions - กลับเป็นสีเดิม */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button className="p-2 text-neon-blue hover:text-neon-pink cursor-pointer transition-colors rounded-lg hover:bg-slate-800/50">
              <Search className="w-6 h-6" />
            </button>

            {/* Notifications */}
            <button className="p-2 text-neon-blue hover:text-neon-pink transition-colors cursor-pointer relative rounded-lg hover:bg-slate-800/50">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-neon-pink rounded-full shadow-[0_0_8px_#ff3ec9]"></span>
            </button>

            {/* Profile Dropdown - แก้ไข field ของรูปภาพ */}
            <div className="relative">
              <button
                className="group flex items-center gap-2 px-2 cursor-pointer rounded-lg hover:bg-slate-800/50 transition-colors duration-100"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                {state.user?.profile_pic ? (
                  <img
                    src={state.user.profile_pic}
                    alt="Profile"
                    className="w-12 h-12 flex-shrink-0 rounded-full border-2 border-neon-blue group-hover:border-neon-pink shadow-[0_0_8px_#00fff7] group-hover:shadow-[0_0_8px_#ff3ec9] object-cover transition-all duration-300"
                  />
                ) : (
                  <div className="w-12 h-12 flex-shrink-0 rounded-full border-2 border-neon-blue group-hover:border-neon-pink shadow-[0_0_8px_#00fff7] group-hover:shadow-[0_0_8px_#ff3ec9] bg-slate-800/50 flex items-center justify-center transition-all duration-300">
                    <User className="w-6 h-6 text-neon-blue group-hover:text-neon-pink transition-colors duration-300" />
                  </div>
                )}
                <span
                  className="font-orbitron whitespace-nowrap font-semibold bg-gradient-to-r from-neon-yellow via-neon-orange to-neon-pink bg-clip-text text-transparent"
                  style={{
                    WebkitTextStroke: "0.5px #fff",
                    textShadow: "0 0 8px #ffe066",
                  }}
                >
                  {formatDisplayName(state.user?.name || "")}{" "}
                </span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 1L5 5L1 1"
                    stroke="#00f0ff"
                    className="group-hover:stroke-neon-pink transition-colors duration-300"
                  />
                </svg>
              </button>

              {/* Profile dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-950/95 border border-neon-blue/40 rounded-lg shadow-[0_0_24px_#00fff7] backdrop-blur-md">
                  <div className="px-2 py-2 gap-2 flex flex-col">
                    <div className="rounded-lg hover:bg-slate-800/50 transition-colors duration-100">
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full py-3 px-4 font-orbitron font-semibold cursor-pointer text-transparent hover:from-neon-orange hover:via-neon-yellow hover:to-neon-pink transition-all duration-300 uppercase tracking-widest"
                        style={{
                          background:
                            "linear-gradient(to right, #ffe066, #ff8800, #ff3ec9)",
                          WebkitBackgroundClip: "text",
                          WebkitTextStroke: "0.5px #fff",
                          letterSpacing: "0.08em",
                          textShadow: "0 0 8px #ffe066, 0 0 16px #ff8800",
                        }}
                      >
                        <div className="flex items-center justify-start gap-2">
                          <User
                            className="w-6 h-6 text-neon-yellow"
                            style={{ textShadow: "0 0 8px #ffe066" }}
                          />
                          <span>Profile</span>
                        </div>
                      </button>
                    </div>

                    <div className="rounded-lg hover:bg-slate-800/50 transition-colors duration-100">
                      <button
                        onClick={() => {
                          navigate("/settings");
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full py-3 px-4 font-orbitron font-semibold cursor-pointer text-transparent hover:from-neon-orange hover:via-neon-yellow hover:to-neon-pink transition-all duration-300 uppercase tracking-widest"
                        style={{
                          background:
                            "linear-gradient(to right, #ffe066, #ff8800, #ff3ec9)",
                          WebkitBackgroundClip: "text",
                          WebkitTextStroke: "0.5px #fff",
                          letterSpacing: "0.08em",
                          textShadow: "0 0 8px #ffe066, 0 0 16px #ff8800",
                        }}
                      >
                        <div className="flex items-center justify-start gap-2">
                          <Settings
                            className="w-6 h-6 text-neon-yellow"
                            style={{ textShadow: "0 0 8px #ffe066" }}
                          />
                          <span>Settings</span>
                        </div>
                      </button>
                    </div>

                    <div className="pt-2 border-t border-orange-300/20">
                      <div className="rounded-lg hover:bg-slate-800/50 transition-colors duration-100">
                        <button
                          onClick={handleLogout}
                          className="w-full py-3 px-4 font-orbitron font-semibold cursor-pointer text-transparent transition-all duration-300 uppercase tracking-widest"
                          style={{
                            background:
                              "linear-gradient(to right, #ef4444, #f87171, #ff8800)",
                            WebkitBackgroundClip: "text",
                            WebkitTextStroke: "0.5px #fff",
                            letterSpacing: "0.08em",
                            textShadow: "0 0 8px #ff4444, 0 0 16px #ff8800",
                          }}
                        >
                          <div className="flex items-center justify-start gap-2">
                            <LogOut
                              className="w-6 h-6 text-red-400"
                              style={{ textShadow: "0 0 8px #ff4444" }}
                            />
                            <span>Logout</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-neon-blue hover:text-neon-yellow rounded-lg hover:bg-slate-800/50 transition duration-300 p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <MenuRounded
            fontSize="large"
            style={{
              color: "#ff3ec9",
              filter: `
                      drop-shadow(0 0 18px #ff3ec9) 
                      drop-shadow(0 0 32px #ffb3fa) 
                      drop-shadow(0 0 8px #ff3ec9) 
                      drop-shadow(0 0 2px #fff)
                    `,
              stroke: "#fff",
              strokeWidth: "1px",
              letterSpacing: "0.06em",
            }}
            className="animate-glow cursor-pointer"
          />
        </button>
      </nav>

      {/* Mobile Menu for Logged User */}
      {isMenuOpen && (
        <div className="lg:hidden animate-fade-in-down bg-slate-950/95 border-t border-neon-blue shadow-[0_0_24px_2px_#00fff7] backdrop-blur-md">
          <div className="flex flex-col gap-4 p-6 pt-6 bg-gradient-to-b from-slate-900/80 via-fuchsia-900/40 to-blue-900/30 hover:bg-slate-950/80">
            {/* User info in mobile */}
            <div className="flex items-center space-x-3 pb-4 border-b border-neon-pink/20">
              {state.user?.profile_pic ? (
                <img
                  src={state.user.profile_pic}
                  alt="Profile"
                  className="w-12 h-12 flex-shrink-0 rounded-full border-2 border-neon-blue shadow-[0_0_8px_#00fff7] object-cover"
                />
              ) : (
                <div className="w-12 h-12 flex-shrink-0 rounded-full border-2 border-neon-blue shadow-[0_0_8px_#00fff7] bg-slate-800/50 flex items-center justify-center">
                  <User className="w-8 h-8 text-neon-blue" />
                </div>
              )}
              <div>
                <div
                  className="font-orbitron whitespace-nowrap font-semibold bg-gradient-to-r from-neon-yellow via-neon-orange to-neon-pink bg-clip-text text-transparent"
                  style={{
                    WebkitTextStroke: "0.5px #fff",
                    textShadow: "0 0 8px #ffe066",
                  }}
                >
                  {formatDisplayName(state.user?.name || "")}
                </div>
                <div className="text-neon-blue/70 text-sm font-orbitron">
                  {state.user?.role || "User"}
                </div>
              </div>
            </div>

            {/* Main navigation buttons - ใช้ div ครอบ */}
            <div className="rounded-lg hover:bg-slate-800/50 transition-colors duration-100">
              <button
                className="w-full py-3 font-orbitron font-semibold cursor-pointer bg-gradient-to-r from-neon-yellow via-neon-orange to-neon-pink bg-clip-text text-transparent hover:from-neon-orange hover:via-neon-yellow hover:to-neon-pink transition-all duration-300 uppercase tracking-widest"
                style={{
                  WebkitTextStroke: "0.5px #fff",
                  letterSpacing: "0.08em",
                  textShadow: "0 0 8px #ffe066, 0 0 16px #ff8800",
                }}
                onClick={() => {
                  navigate("/dashboard");
                  setIsMenuOpen(false);
                }}
              >
                Dashboard
              </button>
            </div>

            <div className="rounded-lg hover:bg-slate-800/50 transition-colors duration-100">
              <button
                className="w-full py-3 font-orbitron font-semibold cursor-pointer bg-gradient-to-r from-neon-yellow via-neon-orange to-neon-pink bg-clip-text text-transparent hover:from-neon-orange hover:via-neon-yellow hover:to-neon-pink transition-all duration-300 uppercase tracking-widest"
                style={{
                  WebkitTextStroke: "0.5px #fff",
                  letterSpacing: "0.08em",
                  textShadow: "0 0 8px #ffe066, 0 0 16px #ff8800",
                }}
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/my-posts");
                }}
              >
                My Posts
              </button>
            </div>

            <div className="rounded-lg hover:bg-slate-800/50 transition-colors duration-100">
              <button
                className="w-full py-3 font-orbitron font-semibold cursor-pointer bg-gradient-to-r from-neon-yellow via-neon-orange to-neon-pink bg-clip-text text-transparent hover:from-neon-orange hover:via-neon-yellow hover:to-neon-pink transition-all duration-300 uppercase tracking-widest"
                style={{
                  WebkitTextStroke: "0.5px #fff",
                  letterSpacing: "0.08em",
                  textShadow: "0 0 8px #ffe066, 0 0 16px #ff8800",
                }}
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/create-post");
                }}
              >
                Create Post
              </button>
            </div>

            {/* Profile & Settings buttons - ใช้ div ครอบ */}
            <div className="rounded-lg hover:bg-slate-800/50 transition-colors duration-100">
              <button
                className="w-full py-3 font-orbitron font-semibold cursor-pointer bg-gradient-to-r from-neon-yellow via-neon-orange to-neon-pink bg-clip-text text-transparent hover:from-neon-orange hover:via-neon-yellow hover:to-neon-pink transition-all duration-300 uppercase tracking-widest"
                style={{
                  WebkitTextStroke: "0.5px #fff",
                  letterSpacing: "0.08em",
                  textShadow: "0 0 8px #ffe066, 0 0 16px #ff8800",
                }}
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/profile");
                }}
              >
                Profile
              </button>
            </div>

            <div className="rounded-lg hover:bg-slate-800/50 transition-colors duration-100">
              <button
                className="w-full py-3 font-orbitron font-semibold cursor-pointer bg-gradient-to-r from-neon-yellow via-neon-orange to-neon-pink bg-clip-text text-transparent hover:from-neon-orange hover:via-neon-yellow hover:to-neon-pink transition-all duration-300 uppercase tracking-widest"
                style={{
                  WebkitTextStroke: "0.5px #fff",
                  letterSpacing: "0.08em",
                  textShadow: "0 0 8px #ffe066, 0 0 16px #ff8800",
                }}
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/settings");
                }}
              >
                Settings
              </button>
            </div>

            <div className="pt-4 border-t border-neon-orange/20">
              <div className="rounded-lg hover:bg-slate-800/50 transition-colors duration-100">
                <button
                  onClick={handleLogout}
                  className="w-full py-3 font-orbitron font-semibold cursor-pointer bg-gradient-to-r from-red-500 via-red-400 to-neon-orange bg-clip-text text-transparent hover:from-red-700 hover:via-red-600 hover:to-neon-orange transition-all duration-300 uppercase tracking-widest"
                  style={{
                    WebkitTextStroke: "0.5px #fff",
                    letterSpacing: "0.08em",
                    textShadow: "0 0 8px #ff4444, 0 0 16px #ff8800",
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // แสดง loading state
  if (state.getUserLoading) {
    return (
      <div className="w-full bg-slate-950/70 border-b border-neon-blue shadow-[0_0_24px_2px_#00fff7] z-50 mb-8 backdrop-blur-md">
        <div className="flex justify-center items-center p-6">
          <Loader2 className="animate-spin w-6 h-6 text-neon-blue" />
        </div>
      </div>
    );
  }

  // Return ตาม authentication status
  return <>{isAuthenticated ? <UserNavbar /> : <GuestNavbar />}</>;
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
      try {
        if (metaDescription.parentNode) {
          document.head.removeChild(metaDescription);
        }
        if (ogImage.parentNode) {
          document.head.removeChild(ogImage);
        }
        if (ogDescription.parentNode) {
          document.head.removeChild(ogDescription);
        }
      } catch (error) {
        // Ignore errors if elements are already removed
      }
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
              onLoad={(e) => ((e.target as HTMLImageElement).style.opacity = '1')}
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
              onLoad={(e) => ((e.target as HTMLImageElement).style.opacity = '1')}
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
    <footer className="relative overflow-hidden p-0 mt-8 border-t border-neon-pink shadow-[0_0_24px_2px_#fb64b6]">
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

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="w-16 h-16 animate-spin text-foreground" />
        <p className="mt-4 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
}
