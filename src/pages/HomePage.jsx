import React, { useState, useEffect } from "react";
import { Navbar, Footer, HeroSection } from "../components/WebSection";
import ArticleSection from "../components/ArticleSection";

function HomePage() {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://i.imgur.com/UASlokn.jpg";
    img.crossOrigin = "anonymous";
    img.onload = () => setBackgroundLoaded(true);

    if (!document.cookie.includes("yourCookie=value")) {
      document.cookie = "yourCookie=value; path=/; Secure; SameSite=None";
    }
  }, []);

  return (
    <>
      <div
        className={`font-orbitron ${
          backgroundLoaded
            ? "bg-[url(https://i.imgur.com/UASlokn.jpg)]"
            : "bg-slate-950" // สีพื้นหลังชั่วคราวระหว่างโหลด
        } bg-fixed bg-cover md:bg-contain sm:bg-cover bg-center`}
      >
        <Navbar />
        <HeroSection />
        <ArticleSection />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
