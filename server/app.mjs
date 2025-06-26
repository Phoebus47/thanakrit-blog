import dotenv from "dotenv";
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Import ALL routes ที่มีใน authentication.jsx
import postRoutes from "./src/routes/postRoutes.mjs";
import authRoutes from "./src/routes/authRoutes.mjs";
import commentRoutes from "./src/routes/commentRoutes.mjs";
import likeRoutes from "./src/routes/likeRoutes.mjs";
import userRoutes from "./src/routes/userRoutes.mjs";
import uploadRoutes from "./src/routes/uploadRoutes.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({
    message: "Hello TechUp!",
    status: "OK",
    environment: process.env.NODE_ENV || "development",
  });
});

// Add ALL routes ที่ client ต้องการ
app.use("/posts", postRoutes);
app.use("/auth", authRoutes); // สำหรับ /auth/login, /auth/register, /auth/get-user
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);
app.use("/users", userRoutes);
app.use("/upload", uploadRoutes);

// Error handling
app.use((error, req, res, next) => {
  console.error("Server Error:", error);
  res.status(500).json({
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Something went wrong",
  });
});

// Don't listen in production (Vercel handles this)
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });
}

export default app;
