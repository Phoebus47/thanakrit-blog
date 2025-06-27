/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { NavBar, Footer, LoadingScreen } from "../components/WebSection"; // แก้ไข import
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { User, Lock, X, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../contexts/authentication";
import { BackgroundLoader } from "../components/BackgroundLoader";
import axios from "axios";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { state, isAuthenticated } = useAuth();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [valid, setValid] = useState({
    password: true,
    newPassword: true,
    confirmNewPassword: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  // ตรวจสอบ authentication
  useEffect(() => {
    if (state.getUserLoading === false && !isAuthenticated) {
      navigate('/login');
      return;
    }
  }, [state.getUserLoading, isAuthenticated, navigate]);

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const isValidPassword = password.trim() !== "";
    const isValidNewPassword = newPassword.trim() !== "" && newPassword.length >= 8;
    const isValidConfirmPassword = confirmNewPassword.trim() !== "" && confirmNewPassword === newPassword;

    setValid({
      password: isValidPassword,
      newPassword: isValidNewPassword,
      confirmNewPassword: isValidConfirmPassword,
    });

    return isValidPassword && isValidNewPassword && isValidConfirmPassword;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      const response = await axios.put('/auth/reset-password', {
        currentPassword: password,
        newPassword: newPassword,
      });

      const data = response.data;

      toast.custom((t) => (
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg text-white p-4 flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1 font-orbitron">Success!</h2>
            <p className="text-sm font-orbitron">Password reset successful.</p>
          </div>
          <button onClick={() => toast.dismiss(t)} className="text-white hover:text-gray-200">
            <X size={20} />
          </button>
        </div>
      ));

      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong.";
      toast.custom((t) => (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg text-white p-4 flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1 font-orbitron">Error</h2>
            <p className="text-sm font-orbitron">{errorMessage}</p>
          </div>
          <button onClick={() => toast.dismiss(t)} className="text-white hover:text-gray-200">
            <X size={20} />
          </button>
        </div>
      ));
    } finally {
      setIsLoading(false);
    }
  };

  // แสดง loading ขณะตรวจสอบ authentication
  if (state.getUserLoading || state.getUserLoading === null) {
    return (
      <BackgroundLoader imageUrl="/images/bg.webp">
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <LoadingScreen />
        </div>
        <Footer />
      </BackgroundLoader>
    );
  }

  // ถ้าไม่ได้ login
  if (!isAuthenticated) {
    return (
      <BackgroundLoader imageUrl="/images/bg.webp">
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-orbitron text-white mb-4">Access Denied</h1>
            <p className="text-gray-400 font-orbitron">Please login to access this page.</p>
          </div>
        </div>
        <Footer />
      </BackgroundLoader>
    );
  }

  return (
    <BackgroundLoader imageUrl="/images/bg.webp">
      <NavBar />
      
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-slate-950/80 backdrop-blur-md border border-neon-blue/40 rounded-2xl p-8 shadow-[0_0_24px_#00fff7]">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-neon-blue/20 border border-neon-blue/40">
                  <Lock className="h-8 w-8 text-neon-blue" />
                </div>
              </div>
              <h1 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-neon-pink via-neon-blue to-neon-green bg-clip-text text-transparent mb-2">
                Reset Password
              </h1>
              <p className="text-gray-400 font-orbitron">
                Update your password to keep your account secure
              </p>
            </div>

            {/* Navigation Link */}
            <div className="mb-6">
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 cursor-pointer text-neon-blue hover:text-neon-pink transition-colors font-orbitron"
              >
                <User className="h-4 w-4" />
                Back to Profile
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-orbitron font-semibold text-neon-blue mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Input
                    type={showPasswords.current ? "text" : "password"}
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className={`w-full p-3 rounded-lg bg-slate-800/50 border text-white font-orbitron placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-pink/20 ${
                      !valid.password ? "border-red-500 focus:border-red-500" : "border-neon-blue/40 focus:border-neon-pink"
                    }`}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-400 hover:text-neon-blue transition-colors"
                  >
                    {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {!valid.password && (
                  <p className="text-red-400 text-xs mt-1 font-orbitron">
                    Current password is required
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-orbitron font-semibold text-neon-blue mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    type={showPasswords.new ? "text" : "password"}
                    value={newPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                    className={`w-full p-3 rounded-lg bg-slate-800/50 border text-white font-orbitron placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-pink/20 ${
                      !valid.newPassword ? "border-red-500 focus:border-red-500" : "border-neon-blue/40 focus:border-neon-pink"
                    }`}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-400 hover:text-neon-blue transition-colors"
                  >
                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {!valid.newPassword && (
                  <p className="text-red-400 text-xs mt-1 font-orbitron">
                    Password must be at least 8 characters
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-orbitron font-semibold text-neon-blue mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={confirmNewPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmNewPassword(e.target.value)}
                    className={`w-full p-3 rounded-lg bg-slate-800/50 border text-white font-orbitron placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-pink/20 ${
                      !valid.confirmNewPassword ? "border-red-500 focus:border-red-500" : "border-neon-blue/40 focus:border-neon-pink"
                    }`}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-400 hover:text-neon-blue transition-colors"
                  >
                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {!valid.confirmNewPassword && (
                  <p className="text-red-400 text-xs mt-1 font-orbitron">
                    Passwords do not match
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 cursor-pointer bg-gradient-to-r from-neon-blue to-neon-pink rounded-lg font-orbitron font-semibold text-white shadow-[0_0_16px_#00fff7] hover:shadow-[0_0_24px_#00fff7] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Updating..." : "Reset Password"}
                </button>
                
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="px-8 py-3 rounded-lg cursor-pointer border border-neon-blue/40 text-neon-blue hover:bg-neon-blue/10 transition-colors font-orbitron font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </BackgroundLoader>
  );
}