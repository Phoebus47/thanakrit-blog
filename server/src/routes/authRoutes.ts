import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../utils/prisma.js";
import { ApiResponse, CreateUserData, LoginData, User } from "../types/index.js";

const authRoutes = Router();

interface DecodedToken extends JwtPayload {
  userId: string;
}

// Register
authRoutes.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, name, username }: CreateUserData = req.body;

    if (!email || !password || !name || !username) {
      res.status(400).json({
        message: "All fields are required",
      });
      return;
    }

    // Check if user already exists
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (existingUser) {
      res.status(400).json({
        message: "User with this email or username already exists",
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.users.create({
      data: {
        id: crypto.randomUUID(),
        email,
        password: hashedPassword,
        name,
        username,
        role: "user",
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      message: "Server error during registration",
    });
  }
});

// Login
authRoutes.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginData = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required",
      });
      return;
    }

    // Find user
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({
        message: "Invalid credentials",
      });
      return;
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        message: "Invalid credentials",
      });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      message: "Server error during login",
    });
  }
});

// Get current user
authRoutes.get("/get-user", async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({
        message: "No token provided",
      });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret"
    ) as DecodedToken;

    const user = await prisma.users.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: "User found",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error getting user:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        message: "Invalid token",
      });
      return;
    }

    res.status(500).json({
      message: "Server error getting user",
    });
  }
});

// Reset password
authRoutes.put("/reset-password", async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword }: { currentPassword: string; newPassword: string } = req.body;
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({
        message: "No token provided",
      });
      return;
    }

    if (!currentPassword || !newPassword) {
      res.status(400).json({
        message: "Current password and new password are required",
      });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret"
    ) as DecodedToken;

    const user = await prisma.users.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      res.status(401).json({
        message: "User not found",
      });
      return;
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      res.status(400).json({
        message: "Current password is incorrect",
      });
      return;
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    await prisma.users.update({
      where: { id: decoded.userId },
      data: { password: hashedNewPassword },
    });

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error resetting password:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        message: "Invalid token",
      });
      return;
    }

    res.status(500).json({
      message: "Server error during password reset",
    });
  }
});

export default authRoutes;
