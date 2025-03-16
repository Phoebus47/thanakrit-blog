import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="font-orbitron bg-[url(https://imgur.com/0XHwX1g.jpg)] bg-cover md:bg-contain sm:bg-cover bg-center text-white">
        <Navbar />
        <HeroSection />
        <Footer />
      </div>
    </>
  );
}

export default App;
