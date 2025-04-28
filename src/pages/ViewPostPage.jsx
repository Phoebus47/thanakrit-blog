import { Navbar, Footer } from "../components/WebSection";
import { BackgroundLoader } from "@/components/BackgroundLoader";
import { ViewPost } from "@/components/ViewPost";

function ViewPostPage() {
  return (
    <>
      <BackgroundLoader imageUrl="/images/bg.webp">
        <Navbar />
        <ViewPost />
        <Footer />
      </BackgroundLoader>
    </>
  );
}

export default ViewPostPage;
