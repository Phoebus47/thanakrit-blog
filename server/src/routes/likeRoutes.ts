import { Router, Request, Response } from "express";
import prisma from "../utils/prisma.js";
import { ApiResponse, LikeFormData, AsyncRouteHandler } from "../types/index.js";

const likeRoutes = Router();

// GET likes count for a post
const getLikesCount: AsyncRouteHandler<{ postId: string }> = async (req, res) => {
  try {
    const postId = Number(req.params.postId);

    if (isNaN(postId)) {
      res.status(400).json({ message: "Invalid post ID" });
      return;
    }

    const likesCount = await prisma.likes.count({
      where: { post_id: postId },
    });

    res.status(200).json({ count: likesCount });
  } catch (error) {
    console.error("Error fetching likes count:", error);
    res.status(500).json({
      message: "Server could not fetch likes count",
    });
  }
};

likeRoutes.get("/:postId", getLikesCount);

// POST/DELETE like (toggle)
const toggleLike: AsyncRouteHandler<any, any, LikeFormData> = async (req, res) => {
  try {
    const { post_id, user_id } = req.body;

    if (!post_id || !user_id) {
      res.status(400).json({
        message: "Missing required fields",
      });
      return;
    }

    const postIdNum = Number(post_id);
    if (isNaN(postIdNum)) {
      res.status(400).json({
        message: "Invalid post ID",
      });
      return;
    }

    // Check if like exists
    const existingLike = await prisma.likes.findFirst({
      where: {
        post_id: postIdNum,
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
          post_id: postIdNum,
          user_id: user_id,
        },
      });
    }

    // Get updated count
    const likesCount = await prisma.likes.count({
      where: { post_id: postIdNum },
    });

    res.status(200).json({
      count: likesCount,
      action: existingLike ? "unliked" : "liked",
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({
      message: "Server could not toggle like",
    });
  }
};

likeRoutes.post("/", toggleLike);

export default likeRoutes;
