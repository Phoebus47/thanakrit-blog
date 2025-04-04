import { Navbar, Footer } from "../components/WebSection";
import { BackgroundLoader } from "@/components/BackgroundLoader";
import { ViewPost } from "@/components/ViewPost";

function ViewPostPage() {
  return (
    <>
      <BackgroundLoader imageUrl="https://i.imgur.com/UASlokn.jpg">
        <Navbar />
        <ViewPost />
        <Footer />
      </BackgroundLoader>
    </>
  );
}

export default ViewPostPage;
