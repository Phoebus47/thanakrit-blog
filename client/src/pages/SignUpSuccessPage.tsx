import { NavBar, Footer } from "../components/WebSection";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BackgroundLoader } from "../components/BackgroundLoader";

export default function SignUpSuccessPage() {
  const navigate = useNavigate();
  
  return (
    <BackgroundLoader imageUrl="/images/bg.webp">
      <NavBar />
      
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-slate-950/80 backdrop-blur-md border border-neon-blue/40 rounded-2xl p-8 shadow-[0_0_24px_#00fff7]">
            {/* Success Icon */}
            <div className="flex justify-center mb-8">
              <div className="h-20 w-20 bg-gradient-to-br from-neon-green via-neon-blue to-neon-pink rounded-full flex items-center justify-center shadow-[0_0_24px_#00fff7]">
                <Check className="h-12 w-12 text-white drop-shadow-[0_0_8px_#00fff7]" strokeWidth={3} />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-orbitron font-bold text-center mb-6 bg-gradient-to-r from-neon-pink via-neon-blue to-neon-green bg-clip-text text-transparent">
              Registration Successful!
            </h1>

            {/* Description */}
            <p className="text-center text-gray-400 font-orbitron mb-8">
              Your account has been created successfully. You can now log in with your credentials.
            </p>

            {/* Continue Button */}
            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 bg-gradient-to-r from-neon-blue to-neon-pink rounded-lg cursor-pointer font-orbitron font-semibold text-white shadow-[0_0_16px_#00fff7] hover:shadow-[0_0_24px_#00fff7] transition-all duration-300"
            >
              Continue to Login
            </button>

            {/* Additional Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 font-orbitron">
                Want to explore first?{" "}
                <button
                  onClick={() => navigate("/")}
                  className="text-neon-pink hover:text-neon-yellow transition-colors cursor-pointer font-semibold"
                >
                  Go to Home
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </BackgroundLoader>
  );
}