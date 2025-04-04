import { useEffect, useState } from "react";

export function BackgroundLoader({ imageUrl, children }) {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.crossOrigin = "anonymous";
    img.onload = () => setBackgroundLoaded(true);

    // ✅ ตั้งค่า cookie ถ้ายังไม่มี
    if (!document.cookie.includes("yourCookie=value")) {
      document.cookie = "yourCookie=value; path=/; Secure; SameSite=None";
    }
  }, [imageUrl]);

  const bgClass = backgroundLoaded
    ? `bg-[url(${imageUrl})]`
    : "bg-slate-950"; // ใช้พื้นหลังสีชั่วคราว

  return (
    <div
      className={`font-orbitron ${bgClass} bg-fixed bg-cover md:bg-contain sm:bg-cover bg-center`}
    >
      {children}
    </div>
  );
}
