import { useEffect, useState, ReactNode } from "react";

interface BackgroundLoaderProps {
  imageUrl: string;
  children: ReactNode;
}

export function BackgroundLoader({ imageUrl, children }: BackgroundLoaderProps) {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.crossOrigin = "anonymous";
    img.onload = () => setBackgroundLoaded(true);

    // ✅ ตั้งค่า cookie ถ้ายังไม่มี
    if (!document.cookie.includes("accept_cookie=true")) {
      document.cookie = "accept_cookie=true; path=/; Secure; SameSite=None";
    }
  }, [imageUrl]);

  return (
    <div
  className="font-orbitron bg-fixed bg-cover md:bg-contain sm:bg-cover bg-center"
  style={{
    backgroundImage: backgroundLoaded ? `url(${imageUrl})` : "none",
    backgroundColor: backgroundLoaded ? "transparent" : "#0f172a", // slate-950
  }}
>
  {children}
</div>
  );
}
