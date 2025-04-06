import { Navbar, Footer, HeroSection } from "../components/WebSection";
import ArticleSection from "../components/ArticleSection";
import { BackgroundLoader } from "@/components/BackgroundLoader";

function HomePage() {
  return (
    <>
      <BackgroundLoader
        imageUrl={`http://localhost:3001/proxy?url=${encodeURIComponent(
          "https://res.cloudinary.com/djaxbeibd/image/upload/v1743968378/bg_pv5fkq.webp"
        )}`}
      >
        <Navbar />
        <HeroSection />
        <ArticleSection />
        <Footer />
      </BackgroundLoader>
    </>
  );
}

export default HomePage;
