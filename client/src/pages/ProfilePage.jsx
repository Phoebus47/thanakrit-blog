import { useState, useEffect } from "react";
import { NavBar, Footer } from "@/components/WebSection";
import { useNavigate } from "react-router-dom";
import { X, User, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/authentication";
import { toast } from "sonner";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { state, fetchUser } = useAuth();
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
          <div className="bg-neon-red text-white p-4 rounded-sm flex justify-between items-start shadow-neon-red">
            <div>
              <h2 className="font-bold text-lg mb-1">Failed to fetch profile</h2>
              <p className="text-sm">Please try again later.</p>
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
        <div className="bg-neon-red text-white p-4 rounded-sm flex justify-between items-start shadow-neon-red">
          <div>
            <h2 className="font-bold text-lg mb-1">Invalid file type</h2>
            <p className="text-sm">Please upload a valid image file (JPEG, PNG, GIF, WebP).</p>
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
        <div className="bg-neon-red text-white p-4 rounded-sm flex justify-between items-start shadow-neon-red">
          <div>
            <h2 className="font-bold text-lg mb-1">File too large</h2>
            <p className="text-sm">Please upload an image smaller than 5MB.</p>
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

      // Upload image to backend API แทน Supabase
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
        <div className="bg-neon-green text-white p-4 rounded-sm flex justify-between items-start shadow-neon-green">
          <div>
            <h2 className="font-bold text-lg mb-1">Profile updated successfully</h2>
            <p className="text-sm">Your profile changes have been saved.</p>
          </div>
          <button onClick={() => toast.dismiss(t)} className="text-white hover:text-gray-200">
            <X size={20} />
          </button>
        </div>
      ));
    } catch (error) {
      toast.custom((t) => (
        <div className="bg-neon-red text-white p-4 rounded-sm flex justify-between items-start shadow-neon-red">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to update profile</h2>
            <p className="text-sm">{error.message}</p>
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

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="min-h-screen md:p-8">
        <div className="max-w-4xl mx-auto overflow-hidden">
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
              <div className="flex items-center space-x-2 text-neon-orange txt-shadow-neon-orange font-medium cursor-default">
                <User className="h-5 w-5 mb-1" />
                <span>Profile</span>
              </div>
              <a
                onClick={() => navigate("/reset-password")}
                className="flex items-center gap-2 text-neon-yellow hover:text-neon-orange transition-colors cursor-pointer"
              >
                <Lock className="h-5 w-5 mb-1" />
                Reset password
              </a>
            </div>
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={profile.image}
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <h2 className="ml-3 text-xl font-semibold text-neon-yellow txt-shadow-neon-orange">{profile.name}</h2>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 p-6">
              <nav>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-neon-orange txt-shadow-neon-orange font-medium cursor-default">
                    <User className="h-5 w-5 mb-1" />
                    <span>Profile</span>
                  </div>
                  <a
                    onClick={() => navigate("/reset-password")}
                    className="flex items-center gap-2 text-neon-yellow hover:text-neon-orange transition-colors cursor-pointer"
                  >
                    <Lock className="h-5 w-5 mb-1" />
                    Reset password
                  </a>
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 bg-slate-950/80 border border-neon-orange shadow-neon-orange md:m-2 md:rounded-lg">
              <div className="flex flex-col md:flex-row items-center justify-start md:gap-6 mb-6">
                <Avatar className="h-28 w-28 mb-5">
                  <AvatarImage
                    src={profile.image}
                    alt="Profile"
                    className="object-cover"
                  />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <label className="px-8 py-2 bg-gradient-to-r from-neon-orange to-neon-yellow text-black font-bold rounded-full shadow-[0_0_16px_#ffe066] hover:from-neon-yellow hover:to-neon-orange hover:text-white hover:shadow-[0_0_32px_#ffe066] transition-colors cursor-pointer">
                  Upload profile picture
                  <input
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neon-orange txt-shadow-neon-orange mb-1"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="mt-1 py-3 rounded-sm placeholder:text-neon-yellow text-neon-orange bg-transparent border-neon-orange focus-visible:ring-neon-yellow focus-visible:border-neon-yellow font-orbitron"
                  />
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-neon-orange txt-shadow-neon-orange mb-1"
                  >
                    Username
                  </label>
                  <Input
                    id="username"
                    name="username"
                    value={profile.username}
                    onChange={handleInputChange}
                    className="mt-1 py-3 rounded-sm placeholder:text-neon-yellow text-neon-orange bg-transparent border-neon-orange focus-visible:ring-neon-yellow focus-visible:border-neon-yellow font-orbitron"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neon-orange txt-shadow-neon-orange mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="bg-slate-800/50 text-neon-yellow"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-2 mt-2 bg-gradient-to-r from-neon-orange to-neon-yellow text-black font-bold rounded-full shadow-[0_0_16px_#ffe066] hover:from-neon-yellow hover:to-neon-orange hover:text-white hover:shadow-[0_0_32px_#ffe066] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </form>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}