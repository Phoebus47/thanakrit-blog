import { Router } from "express";
import prisma from "../utils/prisma.mjs";

const likeRoutes = Router();

// GET likes count for a post
likeRoutes.get("/:postId", async (req, res) => {
  try {
    const postId = Number(req.params.postId);

    const likesCount = await prisma.likes.count({
      where: { post_id: postId },
    });

    return res.status(200).json({ count: likesCount });
  } catch (error) {
    console.error("Error fetching likes count:", error);
    return res.status(500).json({
      message: "Server could not fetch likes count",
    });
  }
});

// POST/DELETE like (toggle)
likeRoutes.post("/", async (req, res) => {
  try {
    const { post_id, user_id } = req.body;

    if (!post_id || !user_id) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    // Check if like exists
    const existingLike = await prisma.likes.findFirst({
      where: {
        post_id: Number(post_id),
        user_id: user_id,
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.likes.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      // Like
      await prisma.likes.create({
        data: {
          post_id: Number(post_id),
          user_id: user_id,
        },
      });
    }

    // Get updated count
    const likesCount = await prisma.likes.count({
      where: { post_id: Number(post_id) },
    });

    return res.status(200).json({
      count: likesCount,
      action: existingLike ? "unliked" : "liked",
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    return res.status(500).json({
      message: "Server could not toggle like",
    });
  }
});

export default likeRoutes;
