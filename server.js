import express from "express";
import cors from "cors";
import compression from "compression";
import fetch from "node-fetch";

const app = express();
const PORT = 3001;

// Whitelisted origins for both dev and production
const allowedOrigins = [
  "http://localhost:5173",
  "https://thanakrit-blog.vercel.app/", // เปลี่ยนเป็น domain จริงตอน deploy
];

// Enable compression
app.use(compression());

// Dynamic CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Image proxy endpoint
app.get("/proxy", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("Missing image URL");
  }

  const validUrl = /^https?:\/\//i.test(url);
  if (!validUrl) {
    return res.status(400).send("Invalid image URL");
  }

  // 🚀 Force HTTPS if input is insecure
  let targetUrl = url;
  if (url.startsWith("http://")) {
    console.log(`🔒 Upgrading to HTTPS: ${url}`);
    targetUrl = url.replace("http://", "https://");
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(targetUrl, {
      signal: controller.signal,
      size: 1024 * 1024 * 5, // 5MB limit
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(response.status).send("Failed to fetch image");
    }

    const requestOrigin = req.headers.origin;
    if (allowedOrigins.includes(requestOrigin)) {
      res.setHeader("Access-Control-Allow-Origin", requestOrigin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
    }

    // ✅ Security headers
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'none'; img-src * data: blob:;"
    );

    // ✅ Content headers
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "image/jpeg"
    );
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

    response.body.pipe(res);
  } catch (error) {
    console.error("Image Proxy Error:", error);
    if (error.name === "AbortError") {
      return res.status(504).send("Request timeout");
    }
    res.status(500).send("Server error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
