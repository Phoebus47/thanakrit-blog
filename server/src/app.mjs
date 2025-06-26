import dotenv from 'dotenv';
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import multer from "multer"; // เพิ่มบรรทัดนี้

// Routes
import authRoutes from "./routes/authRoutes.mjs";
import postRoutes from "./routes/postRoutes.mjs";
import commentRoutes from "./routes/commentRoutes.mjs";
import likeRoutes from "./routes/likeRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import uploadRoutes from "./routes/uploadRoutes.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check route - เพิ่มบรรทัดนี้
app.get('/', (req, res) => {
  res.json({ message: 'Server is running', status: 'OK' });
});

// Routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);
app.use("/users", userRoutes);
app.use("/upload", uploadRoutes);

// Error handling
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large' });
    }
  }
  
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`JWT_SECRET exists: ${!!process.env.JWT_SECRET}`);
});

export default app;