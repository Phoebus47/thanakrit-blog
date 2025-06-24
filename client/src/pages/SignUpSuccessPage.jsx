import { NavBar, Footer } from "@/components/WebSection";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BackgroundLoader } from "@/components/BackgroundLoader";

export default function SignUpSuccessPage() {
  const navigate = useNavigate();
  return (
    <BackgroundLoader imageUrl="/images/bg.webp">
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow flex items-center justify-center p-4 my-4">
        <div className="flex flex-col space-y-8 items-center w-full max-w-xl bg-slate-950/80 border border-neon-orange shadow-neon-orange rounded-lg px-3 sm:px-20 py-14">
          <div className="relative">
            <div className="h-20 w-20 bg-gradient-to-br from-neon-green via-neon-yellow to-neon-orange rounded-full flex items-center justify-center shadow-[0_0_24px_#00ff00]">
              <Check className="h-12 w-12 text-white drop-shadow-[0_0_8px_#00ff00]" strokeWidth={3} />
            </div>
          </div>
          <h1 className="mt-6 text-3xl font-orbitron font-bold text-neon-yellow txt-shadow-neon-orange text-center">
            Registration Successful
          </h1>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-gradient-to-r from-neon-orange to-neon-yellow text-black font-bold rounded-full shadow-[0_0_16px_#ffe066] hover:from-neon-yellow hover:to-neon-orange hover:text-white hover:shadow-[0_0_32px_#ffe066] transition-colors"
          >
            Continue
          </button>
        </div>
      </main>
      <Footer />
    </div>
    </BackgroundLoader>
  );
}