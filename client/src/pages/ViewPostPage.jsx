import { NavBar, Footer } from "../components/WebSection";
import { BackgroundLoader } from "@/components/BackgroundLoader";
import { ViewPost, LoadingScreen } from "@/components/ViewPost";
import { useState } from "react";

function ViewPostPage() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <BackgroundLoader imageUrl="/images/bg.webp">
        <NavBar />
        <ViewPost onLoadingChange={setIsLoading} />
        {isLoading ? <LoadingScreen /> : <Footer />}
      </BackgroundLoader>
    </>
  );
}

export default ViewPostPage;
