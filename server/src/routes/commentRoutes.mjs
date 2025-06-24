import { Router } from "express";
import prisma from "../utils/prisma.mjs";

const commentRoutes = Router();

// GET comments by post ID
commentRoutes.get("/:postId", async (req, res) => {
  try {
    const postId = Number(req.params.postId);
    
    const comments = await prisma.comments.findMany({
      where: { post_id: postId },
      include: { 
        users: {
          select: {
            name: true,
            profile_pic: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    return res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({
      message: "Server could not fetch comments"
    });
  }
});

// POST new comment
commentRoutes.post("/", async (req, res) => {
  try {
    const { post_id, user_id, comment_text } = req.body;

    if (!post_id || !user_id || !comment_text) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const comment = await prisma.comments.create({
      data: {
        post_id: Number(post_id),
        user_id,
        comment_text
      },
      include: {
        users: {
          select: {
            name: true,
            profile_pic: true
          }
        }
      }
    });

    return res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({
      message: "Server could not create comment"
    });
  }
});

export default commentRoutes;