import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { preloadImage } from "./utils/preloadImage.js";

preloadImage(
  `${__PROXY_BASE__}?url=https://res.cloudinary.com/djaxbeibd/image/upload/w_auto,c_limit/v1743968377/avartar_damkm6.webp`
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
