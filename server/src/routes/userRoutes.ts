import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";
import { ApiResponse, JwtPayload, UserUpdateData, AsyncRouteHandler } from "../types/index.js";

const userRoutes = Router();

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

// GET user by ID
const getUserById: AsyncRouteHandler<{ userId: string }> = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if user owns this account
    if (req.user?.userId !== userId) {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      message: "Server could not fetch user",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

userRoutes.get("/:userId", authenticateToken, getUserById);

// UPDATE user by ID
const updateUser: AsyncRouteHandler<{ userId: string }, any, UserUpdateData> = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, username, profile_pic } = req.body;

    // Check if user owns this account
    if (req.user?.userId !== userId) {
      res.status(403).json({ message: "Access denied" });
      return;
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
        res.status(400).json({
          message: "Username already taken",
        });
        return;
      }
    }

    const updateData: Partial<UserUpdateData> = {};
    if (name) updateData.name = name;
    if (username) updateData.username = username;
    if (profile_pic) updateData.profile_pic = profile_pic;

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: updateData,
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      message: "Server could not update user",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

userRoutes.put("/:userId", authenticateToken, updateUser);

export default userRoutes;
