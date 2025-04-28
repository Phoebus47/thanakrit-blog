import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { useNavigate } from "react-router-dom";
import { BackgroundLoader } from "@/components/BackgroundLoader";
import { Navbar, Footer } from "../components/WebSection";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <BackgroundLoader imageUrl="/images/bg.webp">
        <Navbar />
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
            className="px-6 py-3 bg-neon-red shadow-neon-red text-white rounded-lg hover:bg-neon-red/80 hover:shadow-neon-red transition duration-300"
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
