import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { useNavigate } from "react-router-dom";
import { BackgroundLoader } from "@/components/BackgroundLoader";
import { NavBar, Footer } from "../components/WebSection";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <BackgroundLoader imageUrl="/images/bg.webp">
        <NavBar />
        <div className="flex flex-col items-center justify-center h-screen text-neon-white txt-shadow-neon-red">
          <ErrorOutlineRoundedIcon
            className="text-neon-red mb-4"
            style={{ fontSize: "6rem" }}
          />
          <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
          <p className="text-lg mb-4">
            The page you are looking for does not exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-neon-red via-neon-yellow to-neon-orange shadow-[0_0_24px_#ff3ec9] text-slate-900 font-bold rounded-full hover:from-neon-yellow hover:to-neon-red hover:text-white hover:shadow-[0_0_32px_#ffe066] transition-all duration-300"
          >
            Go to Homepage
          </button>
        </div>
        <Footer />
      </BackgroundLoader>
    </>
  );
}

export default NotFoundPage;
