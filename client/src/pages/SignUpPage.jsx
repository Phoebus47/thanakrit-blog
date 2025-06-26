import React, { useState } from "react";
import { useAuth } from "../contexts/authentication";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { BackgroundLoader } from "../components/BackgroundLoader";
import { NavBar, Footer } from "../components/WebSection";

export default function SignUpPage() {
  const { register, state } = useAuth();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateInputs = () => {
    const errors = {};

    // Validate name
    if (!formValues.name.trim()) {
      errors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formValues.name)) {
      errors.name = "Name must contain only letters and spaces.";
    } else if (formValues.name.length < 3) {
      errors.name = "Name must be at least 3 characters long.";
    }

    // Validate username
    if (!formValues.username.trim()) {
      errors.username = "Username is required.";
    } else if (!/^[a-zA-Z0-9._-]+$/.test(formValues.username)) {
      errors.username =
        "Username can only contain letters, numbers, dots, underscores, and dashes.";
    } else if (formValues.username.length < 5) {
      errors.username = "Username must be at least 5 characters long.";
    } else if (formValues.username.length > 15) {
      errors.username = "Username cannot exceed 15 characters.";
    }

    // Validate email
    if (!formValues.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Validate password
    if (!formValues.password.trim()) {
      errors.password = "Password is required.";
    } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(formValues.password)) {
      errors.password = "Password must contain letters and numbers.";
    } else if (formValues.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInputs();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const result = await register(formValues);
      
      if (result?.success) {
        navigate("/login"); // redirect ไปหน้า login หลัง register สำเร็จ
      }
      
      if (result?.error) {
        console.error("Registration error:", result.error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <BackgroundLoader imageUrl="/images/bg.webp">
      <NavBar />

      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md md:max-w-[798px]">
          <div className="bg-slate-950/80 backdrop-blur-md border border-neon-blue/40 rounded-2xl p-8 shadow-[0_0_24px_#00fff7]">
            <h1 className="text-3xl font-orbitron font-bold text-center mb-8 bg-gradient-to-r from-neon-pink via-neon-blue to-neon-green bg-clip-text text-transparent">
              Create Account
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
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-slate-800/50 border border-neon-blue/40 text-white font-orbitron placeholder-gray-400 focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/20"
                  placeholder="Enter your full name"
                />
                {formErrors.name && (
                  <p className="text-red-400 text-xs mt-1 font-orbitron">
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-orbitron font-semibold text-neon-blue mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formValues.username}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-slate-800/50 border border-neon-blue/40 text-white font-orbitron placeholder-gray-400 focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/20"
                  placeholder="Choose a username"
                />
                {formErrors.username && (
                  <p className="text-red-400 text-xs mt-1 font-orbitron">
                    {formErrors.username}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-orbitron font-semibold text-neon-blue mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-slate-800/50 border border-neon-blue/40 text-white font-orbitron placeholder-gray-400 focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/20"
                  placeholder="Enter your email"
                />
                {formErrors.email && (
                  <p className="text-red-400 text-xs mt-1 font-orbitron">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-orbitron font-semibold text-neon-blue mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}

                    className="w-full p-3 rounded-lg bg-slate-800/50 border border-neon-blue/40 text-white font-orbitron placeholder-gray-400 focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/20"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-neon-blue transition-colors"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="text-red-400 text-xs mt-1 font-orbitron">
                    {formErrors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={state.loading}
                className="w-full py-3 cursor-pointer bg-gradient-to-r from-neon-blue to-neon-pink rounded-lg font-orbitron font-semibold text-white shadow-[0_0_16px_#00fff7] hover:shadow-[0_0_24px_#00fff7] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin w-5 h-5 mr-2" />
                    Creating account...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 font-orbitron">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-neon-pink hover:text-neon-yellow transition-colors font-semibold"
                >
                  Log in
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