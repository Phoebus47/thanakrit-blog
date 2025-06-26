import { Router } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.mjs";

const userRoutes = Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

// GET user by ID
userRoutes.get("/:userId", authenticateToken, async (req, res) => {
  try {
    const userId = req.params.userId;

    // ตรวจสอบว่าเป็นเจ้าของ account หรือไม่
    if (req.user.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      message: "Server could not fetch user",
      error: error.message
    });
  }
});

// UPDATE user by ID
userRoutes.put("/:userId", authenticateToken, async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, username, profile_pic } = req.body;

    // ตรวจสอบว่าเป็นเจ้าของ account หรือไม่
    if (req.user.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Check if username is already taken (if changed)
    if (username) {
      const existingUser = await prisma.users.findFirst({
        where: {
          username: username,
          NOT: { id: userId },
        },
      });

      if (existingUser) {
        return res.status(400).json({
          message: "Username already taken",
        });
      }
    }

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(username && { username }),
        ...(profile_pic && { profile_pic }),
      },
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      message: "Server could not update user",
      error: error.message
    });
  }
});

export default userRoutes;
