import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import ArticleSection from "./components/ArticleSection";

function App() {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      const img = new Image();
      img.src = "https://imgur.com/UASlokn.jpg"; // URL ของภาพพื้นหลัง
      img.onload = () => setBackgroundLoaded(true);
    };
    loadImage();
  }, []);

  return (
    <div
      className={`font-orbitron ${
        backgroundLoaded
          ? "bg-[url(https://imgur.com/UASlokn.jpg)]"
          : "bg-slate-950" // สีพื้นหลังชั่วคราวระหว่างโหลด
      } bg-fixed bg-cover md:bg-contain sm:bg-cover bg-center`}
    >
      <Navbar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </div>
  );
}

export default App;
