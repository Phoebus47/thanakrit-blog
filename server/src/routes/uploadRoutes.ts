import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import { createClient } from '@supabase/supabase-js';
import { ApiResponse, JwtPayload, AsyncRouteHandler } from "../types/index.js";

const uploadRoutes = Router();

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '' // Use service role key
);

// Middleware to verify JWT token
const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({
      message: "No token provided",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
    return;
  }
};

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

// Upload profile picture
const uploadProfile: AsyncRouteHandler = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const fileExt = req.file.originalname.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `profiles/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('profile-pictures')
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true
      });

    if (error) {
      console.error('Supabase upload error:', error);
      res.status(500).json({ 
        message: "Failed to upload image",
      });
      return;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('profile-pictures')
      .getPublicUrl(filePath);

    res.status(200).json({ 
      imageUrl: urlData.publicUrl,
      message: "Image uploaded successfully"
    });

  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({
      message: "Server could not upload file",
    });
  }
};

uploadRoutes.post("/profile", authenticateToken, upload.single("image"), uploadProfile);

export default uploadRoutes;
