import express from "express";
import cors from "cors";
import compression from "compression";
import fetch from "node-fetch";

const app = express();
const PORT = 3001;

// Enable compression
app.use(compression());

// Enable CORS
app.use(cors());

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

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(url, {
      signal: controller.signal,
      size: 1024 * 1024 * 5, // 5MB limit
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(response.status).send("Failed to fetch image");
    }

    // ✅ Important CORS header for proxy responses
    res.setHeader("Access-Control-Allow-Origin", "*"); // หรือใช้เฉพาะ origin เช่น 'http://localhost:5173'

    // Security headers
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'none'; img-src 'self'"
    );

    // Content headers
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "image/jpeg"
    );
    // res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=59");
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
