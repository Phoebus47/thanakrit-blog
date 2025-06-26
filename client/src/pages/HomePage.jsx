import { NavBar, Footer, HeroSection } from "../components/WebSection";
import ArticleSection from "../components/ArticleSection";
import { BackgroundLoader } from "@/components/BackgroundLoader";

function HomePage() {
  return (
    <>
      <BackgroundLoader imageUrl="/images/bg.webp">
        <NavBar />
        <HeroSection />
        <ArticleSection />
        <Footer />
      </BackgroundLoader>
    </>
  );
}

export default HomePage;
