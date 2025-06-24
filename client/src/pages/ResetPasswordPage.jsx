/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavBar, Footer } from "@/components/WebSection";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Lock, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@radix-ui/react-alert-dialog";
import { toast } from "sonner";
import { useAuth } from "@/contexts/authentication";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [valid, setValid] = useState({
    password: true,
    newPassword: true,
    confirmNewPassword: true,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { state } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidPassword = password.trim() !== "";
    const isValidNewPassword = newPassword.trim() !== "" && newPassword.length >= 8;
    const isValidConfirmPassword =
      confirmNewPassword.trim() !== "" && confirmNewPassword === newPassword;

    setValid({
      password: isValidPassword,
      newPassword: isValidNewPassword,
      confirmNewPassword: isValidConfirmPassword,
    });

    if (isValidPassword && isValidNewPassword && isValidConfirmPassword) {
      setIsDialogOpen(true);
    }
  };

  const handleResetPassword = async () => {
    try {
      setIsDialogOpen(false);

      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Update password with Backend API
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/reset-password`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: password,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      toast.custom((t) => (
        <div className="bg-neon-green text-white p-4 rounded-sm flex justify-between items-start shadow-neon-green">
          <div>
            <h2 className="font-bold text-lg mb-1">Success!</h2>
            <p className="text-sm">Password reset successful. You can now log in with your new password.</p>
          </div>
          <button onClick={() => toast.dismiss(t)} className="text-white hover:text-gray-200">
            <X size={20} />
          </button>
        </div>
      ));

      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      toast.custom((t) => (
        <div className="bg-neon-red text-white p-4 rounded-sm flex justify-between items-start shadow-neon-red">
          <div>
            <h2 className="font-bold text-lg mb-1">Error</h2>
            <p className="text-sm">{error.message || "Something went wrong. Please try again."}</p>
          </div>
          <button onClick={() => toast.dismiss(t)} className="text-white hover:text-gray-200">
            <X size={20} />
          </button>
        </div>
      ));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="min-h-screen md:p-8">
        <div className="max-w-4xl w-full md:mx-auto overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center p-6">
            <Avatar className="h-14 w-14">
              <AvatarImage
                src={state.user?.profile_pic}
                alt="Profile"
                className="object-cover"
              />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-neon-yellow txt-shadow-neon-orange">{state.user?.name}</h1>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden p-4">
            <div className="flex justify-start gap-12 items-center mb-4">
              <a
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 text-neon-yellow hover:text-neon-orange transition-colors cursor-pointer"
              >
                <User className="h-5 w-5 mb-1" />
                Profile
              </a>
              <div className="flex items-center space-x-2 text-neon-orange txt-shadow-neon-orange font-medium cursor-default">
                <Lock className="h-5 w-5 mb-1" />
                <span>Reset password</span>
              </div>
            </div>
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={state.user?.profile_pic}
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <h2 className="ml-3 text-xl font-semibold text-neon-yellow txt-shadow-neon-orange">{state.user?.name}</h2>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 p-6">
              <nav>
                <div className="space-y-3">
                  <a
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-2 text-neon-yellow hover:text-neon-orange transition-colors cursor-pointer"
                  >
                    <User className="h-5 w-5 mb-1" />
                    Profile
                  </a>
                  <div className="flex items-center space-x-2 text-neon-orange txt-shadow-neon-orange font-medium cursor-default">
                    <Lock className="h-5 w-5 mb-1" />
                    <span>Reset password</span>
                  </div>
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 bg-slate-950/80 border border-neon-orange shadow-neon-orange md:m-2 md:rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="relative">
                  <label
                    htmlFor="current-password"
                    className="block text-sm font-medium text-neon-orange txt-shadow-neon-orange mb-1"
                  >
                    Current password
                  </label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Current password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`mt-1 py-3 rounded-sm placeholder:text-neon-yellow text-neon-orange bg-transparent border-neon-orange focus-visible:ring-neon-yellow focus-visible:border-neon-yellow font-orbitron ${
                      !valid.password ? "border-neon-red" : ""
                    }`}
                  />
                  {!valid.password && (
                    <p className="text-neon-red text-xs absolute mt-1">
                      This field is required
                    </p>
                  )}
                </div>
                <div className="relative">
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-medium text-neon-orange txt-shadow-neon-orange mb-1"
                  >
                    New password
                  </label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`mt-1 py-3 rounded-sm placeholder:text-neon-yellow text-neon-orange bg-transparent border-neon-orange focus-visible:ring-neon-yellow focus-visible:border-neon-yellow font-orbitron ${
                      !valid.newPassword ? "border-neon-red" : ""
                    }`}
                  />
                  {!valid.newPassword && (
                    <p className="text-neon-red text-xs absolute mt-1">
                      Password must be at least 8 characters
                    </p>
                  )}
                </div>
                <div className="relative">
                  <label
                    htmlFor="confirm-new-password"
                    className="block text-sm font-medium text-neon-orange txt-shadow-neon-orange mb-1"
                  >
                    Confirm new password
                  </label>
                  <Input
                    id="confirm-new-password"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className={`mt-1 py-3 rounded-sm placeholder:text-neon-yellow text-neon-orange bg-transparent border-neon-orange focus-visible:ring-neon-yellow focus-visible:border-neon-yellow font-orbitron ${
                      !valid.confirmNewPassword ? "border-neon-red" : ""
                    }`}
                  />
                  {!valid.confirmNewPassword && (
                    <p className="text-neon-red text-xs absolute mt-1">
                      Passwords do not match
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-8 py-2 bg-gradient-to-r from-neon-orange to-neon-yellow text-black font-bold rounded-full shadow-[0_0_16px_#ffe066] hover:from-neon-yellow hover:to-neon-orange hover:text-white hover:shadow-[0_0_32px_#ffe066] transition-colors"
                >
                  Reset password
                </button>
              </form>
            </main>
          </div>
        </div>
      </div>
      <Footer />
      <ResetPasswordModal
        dialogState={isDialogOpen}
        setDialogState={setIsDialogOpen}
        resetFunction={handleResetPassword}
      />
    </div>
  );
}

function ResetPasswordModal({ dialogState, setDialogState, resetFunction }) {
  return (
    <AlertDialog open={dialogState} onOpenChange={setDialogState}>
      <AlertDialogContent className="bg-slate-950 border border-neon-orange text-white rounded-md pt-16 pb-6 max-w-[22rem] sm:max-w-md flex flex-col items-center">
        <AlertDialogTitle className="text-3xl font-semibold pb-2 text-center text-neon-yellow txt-shadow-neon-orange">
          Reset password
        </AlertDialogTitle>
        <AlertDialogDescription className="flex flex-row mb-2 justify-center font-medium text-center text-neon-orange">
          Do you want to reset your password?
        </AlertDialogDescription>
        <div className="flex flex-row gap-4">
          <button
            onClick={() => setDialogState(false)}
            className="px-10 py-4 rounded-full text-neon-orange border border-neon-orange hover:bg-neon-orange hover:text-black transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={resetFunction}
            className="rounded-full text-black bg-gradient-to-r from-neon-orange to-neon-yellow hover:from-neon-yellow hover:to-neon-orange hover:text-white transition-colors py-4 text-lg px-10"
          >
            Reset
          </button>
        </div>
        <AlertDialogCancel className="absolute right-4 top-2 sm:top-4 p-1 border-none bg-transparent hover:bg-transparent text-neon-red hover:text-neon-orange">
          <X className="h-6 w-6" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}