import React, { useState } from "react";
import { useAuth } from "../contexts/authentication";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { BackgroundLoader } from "../components/BackgroundLoader";
import { NavBar, Footer } from "../components/WebSection";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { login, state } = useAuth();
  const navigate = useNavigate(); // ใช้ useNavigate ใน component นี้

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await login(formData);

    // หาก login สำเร็จ ให้ redirect
    if (result?.success) {
      navigate("/"); // หรือ navigate("/dashboard")
    }

    // หาก login ผิดพลาด จะแสดง error ใน state.error
    if (result?.error) {
      console.error("Login error:", result.error);
    }
  };

  return (
    <BackgroundLoader imageUrl="/images/bg.webp">
      <NavBar />

      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md md:max-w-[798px]">
          <div className="bg-slate-950/80 backdrop-blur-md border border-neon-blue/40 rounded-2xl p-8 shadow-[0_0_24px_#00fff7]">
            <h1 className="text-3xl font-orbitron font-bold text-center mb-8 bg-gradient-to-r from-neon-pink via-neon-blue to-neon-green bg-clip-text text-transparent">
              Welcome Back
            </h1>

            {/* Error Message */}
            {state.error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm font-orbitron text-center">
                  {state.error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-orbitron font-semibold text-neon-blue mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg bg-slate-800/50 border border-neon-blue/40 text-white font-orbitron placeholder-gray-400 focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/20"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-orbitron font-semibold text-neon-blue mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg bg-slate-800/50 border border-neon-blue/40 text-white font-orbitron placeholder-gray-400 focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/20"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-neon-blue transition-colors"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={state.loading || false}
                className="w-full py-3 cursor-pointer bg-gradient-to-r from-neon-blue to-neon-pink rounded-lg font-orbitron font-semibold text-white shadow-[0_0_16px_#00fff7] hover:shadow-[0_0_24px_#00fff7] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin w-5 h-5 mr-2" />
                    Logging in...
                  </div>
                ) : (
                  "Log In"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 font-orbitron">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-neon-pink hover:text-neon-yellow transition-colors font-semibold"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </BackgroundLoader>
  );
}

export default LoginPage;
