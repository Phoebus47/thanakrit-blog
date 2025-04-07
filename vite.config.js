import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __PROXY_BASE__: JSON.stringify(
      process.env.NODE_ENV === "production"
        ? "https://thanakrit-blog.vercel.app/proxy"
        : "http://localhost:3001/proxy"
    ),
  },
  build: {
    manifest: true,
    sourcemap: true,
  },
  server: {
    proxy: {
      '/proxy': 'http://localhost:3001',
    },
  },
});
