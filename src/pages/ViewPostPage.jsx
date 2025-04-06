import { Navbar, Footer } from "../components/WebSection";
import { BackgroundLoader } from "@/components/BackgroundLoader";
import { ViewPost } from "@/components/ViewPost";

function ViewPostPage() {
  return (
    <>
      <BackgroundLoader
        imageUrl={`http://localhost:3001/proxy?url=${encodeURIComponent(
          "https://res.cloudinary.com/djaxbeibd/image/upload/v1743968378/bg_pv5fkq.webp"
        )}`}
      >
        <Navbar />
        <ViewPost />
        <Footer />
      </BackgroundLoader>
    </>
  );
}

export default ViewPostPage;
