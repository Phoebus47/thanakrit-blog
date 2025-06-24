import { Router } from "express";
import prisma from "../utils/prisma.mjs";

const userRoutes = Router();

// GET user by ID
userRoutes.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const user = await prisma.users.findUnique({
      where: { id: userId }
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
      message: "Server could not fetch user"
    });
  }
});

// UPDATE user by ID
userRoutes.put("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, username, profile_pic } = req.body;

    // Check if username is already taken (if changed)
    if (username) {
      const existingUser = await prisma.users.findFirst({
        where: {
          username: username,
          NOT: { id: userId }
        }
      });

      if (existingUser) {
        return res.status(400).json({
          message: "Username already taken"
        });
      }
    }

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(username && { username }),
        ...(profile_pic && { profile_pic })
      }
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;
    
    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      message: "Server could not update user"
    });
  }
});

export default userRoutes;