import { useState, useEffect } from "react";
import { NavBar, Footer, LoadingScreen } from "../components/WebSection";
import { useNavigate } from "react-router-dom";
import { X, User, Lock, Camera } from "lucide-react";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useAuth } from "../contexts/authentication";
import { toast } from "sonner";
import { BackgroundLoader } from "../components/BackgroundLoader";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { state, fetchUser, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState({
    image: "",
    name: "",
    username: "",
    email: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!state.user) return;
        setProfile({
          image: state.user.profile_pic || "",
          name: state.user.name || "",
          username: state.user.username || "",
          email: state.user.email || "",
        });
      } catch {
        toast.custom((t) => (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg text-white p-4 flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg mb-1 font-orbitron">Failed to fetch profile</h2>
              <p className="text-sm font-orbitron">Please try again later.</p>
            </div>
            <button onClick={() => toast.dismiss(t)} className="text-white hover:text-gray-200">
              <X size={20} />
            </button>
          </div>
        ));
      }
    };

    fetchProfile();
  }, [state.user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.custom((t) => (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg text-white p-4 flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1 font-orbitron">Invalid file type</h2>
            <p className="text-sm font-orbitron">Please upload a valid image file (JPEG, PNG, GIF, WebP).</p>
          </div>
          <button onClick={() => toast.dismiss(t)} className="text-white hover:text-gray-200">
            <X size={20} />
          </button>
        </div>
      ));
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.custom((t) => (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg text-white p-4 flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1 font-orbitron">File too large</h2>
            <p className="text-sm font-orbitron">Please upload an image smaller than 5MB.</p>
          </div>
          <button onClick={() => toast.dismiss(t)} className="text-white hover:text-gray-200">
            <X size={20} />
          </button>
        </div>
      ));
      return;
    }

    setImageFile(file);
    setProfile((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);

      let profilePicUrl = profile.image;

      // Upload image to backend API
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('userId', state.user.id);

        const uploadResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/upload/profile`, {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) throw new Error('Failed to upload image');
        
        const uploadData = await uploadResponse.json();
        profilePicUrl = uploadData.imageUrl;
      }

      // Update user profile via backend API
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/${state.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profile.name,
          username: profile.username,
          profile_pic: profilePicUrl,
        }),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      toast.custom((t) => (
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg text-white p-4 flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1 font-orbitron">Success!</h2>
            <p className="text-sm font-orbitron">Your profile has been updated successfully.</p>
          </div>
          <button onClick={() => toast.dismiss(t)} className="text-white hover:text-gray-200">
            <X size={20} />
          </button>
        </div>
      ));
    } catch (error) {
      toast.custom((t) => (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg text-white p-4 flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1 font-orbitron">Error</h2>
            <p className="text-sm font-orbitron">{error.message}</p>
          </div>
          <button onClick={() => toast.dismiss(t)} className="text-white hover:text-gray-200">
            <X size={20} />
          </button>
        </div>
      ));
    } finally {
      setIsSaving(false);
      fetchUser();
    }
  };

  // ตรวจสอบ authentication
  useEffect(() => {
    if (state.getUserLoading === false && !isAuthenticated) {
      navigate('/login');
      return;
    }
  }, [state.getUserLoading, isAuthenticated, navigate]);

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

  // ถ้าไม่ได้ login ให้แสดงข้อความ
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
        <div className="w-full max-w-4xl">
          <div className="bg-slate-950/80 backdrop-blur-md border border-neon-blue/40 rounded-2xl p-8 shadow-[0_0_24px_#00fff7]">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-neon-blue shadow-[0_0_8px_#00fff7]">
                  <AvatarImage
                    src={profile.image}
                    alt="Profile"
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-slate-800 text-neon-blue">
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <label className="absolute -bottom-2 -right-2 bg-neon-blue hover:bg-neon-pink transition-colors rounded-full p-2 cursor-pointer shadow-[0_0_8px_#00fff7]">
                  <Camera className="h-4 w-4 text-white" />
                  <input
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-neon-pink via-neon-blue to-neon-green bg-clip-text text-transparent mb-2">
                  Profile Settings
                </h1>
                <p className="text-gray-400 font-orbitron">
                  Manage your account information and preferences
                </p>
              </div>

              {/* Navigation Links */}
              <div className="ml-auto hidden md:flex gap-4">
                <button
                  onClick={() => navigate("/reset-password")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-slate-800/50 border border-neon-pink/40 text-neon-pink hover:bg-neon-pink/10 transition-colors font-orbitron"
                >
                  <Lock className="h-4 w-4" />
                  Reset Password
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden mb-6">
              <button
                onClick={() => navigate("/reset-password")}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg cursor-pointer bg-slate-800/50 border border-neon-pink/40 text-neon-pink hover:bg-neon-pink/10 transition-colors font-orbitron"
              >
                <Lock className="h-4 w-4" />
                Reset Password
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-orbitron font-semibold text-neon-blue mb-2">
                    Full Name
                  </label>
                  <Input
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-slate-800/50 border border-neon-blue/40 text-white font-orbitron placeholder-gray-400 focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/20"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-orbitron font-semibold text-neon-blue mb-2">
                    Username
                  </label>
                  <Input
                    name="username"
                    value={profile.username}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-slate-800/50 border border-neon-blue/40 text-white font-orbitron placeholder-gray-400 focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink/20"
                    placeholder="Choose a username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-orbitron font-semibold text-neon-blue mb-2">
                  Email Address
                </label>
                <Input
                  name="email"
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full p-3 rounded-lg bg-slate-700/50 border border-gray-600/40 text-gray-400 font-orbitron cursor-not-allowed"
                  placeholder="Email cannot be changed"
                />
                <p className="text-xs text-gray-500 mt-1 font-orbitron">
                  Email address cannot be modified for security reasons
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-3 cursor-pointer bg-gradient-to-r from-neon-blue to-neon-pink rounded-lg font-orbitron font-semibold text-white shadow-[0_0_16px_#00fff7] hover:shadow-[0_0_24px_#00fff7] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                
                <button
                  type="button"
                  onClick={() => navigate("/")}
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