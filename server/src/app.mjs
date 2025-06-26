import dotenv from 'dotenv';

// Load environment variables
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config();
}

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import multer from "multer";

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

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Server is running', 
    status: 'OK',
    environment: process.env.NODE_ENV || 'development',
    jwtSecretExists: !!process.env.JWT_SECRET,
    databaseUrlExists: !!process.env.DATABASE_URL
  });
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

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 4000;

// Don't call listen() in Vercel - it's handled automatically
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`JWT_SECRET exists: ${!!process.env.JWT_SECRET}`);
  });
}

export default app;