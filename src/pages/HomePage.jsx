import { Navbar, Footer, HeroSection } from "../components/WebSection";
import ArticleSection from "../components/ArticleSection";
import { BackgroundLoader } from "@/components/BackgroundLoader";

function HomePage() {
  return (
    <>
      <BackgroundLoader imageUrl="/images/bg.webp">
        <Navbar />
        <HeroSection />
        <ArticleSection />
        <Footer />
      </BackgroundLoader>
    </>
  );
}

export default HomePage;
