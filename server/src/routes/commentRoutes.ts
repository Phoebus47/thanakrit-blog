import { Router, Request, Response } from "express";
import prisma from "../utils/prisma.js";
import { ApiResponse, CommentFormData, AsyncRouteHandler } from "../types/index.js";

const commentRoutes = Router();

// GET comments by post ID
const getComments: AsyncRouteHandler<{ postId: string }> = async (req, res) => {
  try {
    const postId = Number(req.params.postId);

    if (isNaN(postId)) {
      res.status(400).json({ message: "Invalid post ID" });
      return;
    }

    const comments = await prisma.comments.findMany({
      where: { post_id: postId },
      include: {
        users: {
          select: {
            name: true,
            profile_pic: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });

    // ไม่ต้อง map users เป็น user แล้ว ให้ส่ง users ตรงๆ
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      message: "Server could not fetch comments",
    });
  }
};

commentRoutes.get("/:postId", getComments);

// POST new comment
const createComment: AsyncRouteHandler<any, any, CommentFormData> = async (req, res) => {
  try {
    const { post_id, user_id, comment_text } = req.body;

    if (!post_id || !user_id || !comment_text) {
      res.status(400).json({
        message: "Missing required fields",
      });
      return;
    }

    const comment = await prisma.comments.create({
      data: {
        post_id: Number(post_id),
        user_id,
        comment_text,
      },
      include: {
        users: {
          select: {
            name: true,
            profile_pic: true,
          },
        },
      },
    });

    // ส่ง users ตรงๆ ไม่ต้อง map เป็น user
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({
      message: "Server could not create comment",
    });
    return;
  }
};

commentRoutes.post("/", createComment);

export default commentRoutes;
