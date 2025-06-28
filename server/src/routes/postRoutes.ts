import { Router, Request, Response } from "express";
import prisma from "../utils/prisma.js";
import { validatePostInput } from "../middlewares/postValidation.js";
import { ApiResponse, PostFormData, AsyncRouteHandler } from "../types/index.js";

const postRoutes = Router();

// CREATE a new post
const createPost: AsyncRouteHandler<any, any, PostFormData> = async (req, res) => {
  try {
    const {
      title,
      image,
      category_id,
      description,
      content,
      status_id,
      date,
      likes_count,
      user_id,
    } = req.body;

    if (
      !title ||
      !image ||
      !category_id ||
      !description ||
      !content ||
      !status_id ||
      !date ||
      !user_id
    ) {
      res.status(400).json({
        message:
          "Server could not create post because there are missing data from client",
      });
      return;
    }

    await (prisma.posts as any).create({
      data: {
        title,
        image,
        category_id,
        description,
        content,
        status_id,
        date: new Date(date),
        likes_count: likes_count || 0,
        user_id,
      },
    });

    res.status(201).json({ message: "Created post successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      message: "Server could not create post because database connection",
    });
  }
};

postRoutes.post("/", validatePostInput, createPost);

// GET all posts with filtering and pagination
const getAllPosts: AsyncRouteHandler = async (req, res) => {
  try {
    const { page = "1", limit = "6", category, keyword } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;
    const take = limitNum;

    // Build where condition
    const where: any = {};

    if (category && category !== "Highlight") {
      where.category_id = parseInt(category as string);
    }

    if (keyword) {
      where.OR = [
        { title: { contains: keyword as string, mode: "insensitive" } },
        { description: { contains: keyword as string, mode: "insensitive" } },
      ];
    }

    // Fetch posts
    const posts = await prisma.posts.findMany({
      where,
      include: {
        categories: true,
        statuses: true,
      },
      orderBy: { date: "desc" },
      skip,
      take,
    });

    // Fetch users data separately for now
    const userIds = posts.map(post => (post as any).user_id).filter(Boolean);
    
    // Convert userIds to strings to ensure correct type matching
    const stringUserIds = userIds.map(id => String(id));
    
    const users = await prisma.users.findMany({
      where: {
        id: { in: stringUserIds }
      },
      select: {
        id: true,
        name: true,
        username: true,
        profile_pic: true,
      },
    });

    // Create a map for quick user lookup - ensure both keys and lookups use strings
    const userMap = new Map(users.map(user => [String(user.id), user]));

    // Count total posts
    const totalPosts = await prisma.posts.count({ where });
    const totalPages = Math.ceil(totalPosts / take);
    const hasMore = pageNum < totalPages;

    // Format response
    const formattedPosts = posts.map((post: any) => {
      const postUserId = String(post.user_id || '');
      const userData = postUserId ? userMap.get(postUserId) : null;
      
      return {
        id: post.id,
        image: post.image,
        category: post.categories?.name,
        title: post.title,
        description: post.description,
        content: post.content,
        date: post.date,
        status_id: post.status_id,
        likes_count: post.likes_count,
        user_id: post.user_id || null,
        users: userData,
      };
    });

    res.status(200).json({
      posts: formattedPosts,
      pagination: {
        currentPage: pageNum,
        totalPages,
        hasMore,
        totalPosts,
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      message: "Server could not read posts because database connection",
    });
  }
};

postRoutes.get("/", getAllPosts);

// GET single post by ID
const getPostById: AsyncRouteHandler<{ postId: string }> = async (req, res) => {
  try {
    const postId = Number(req.params.postId);
    
    if (isNaN(postId)) {
      res.status(400).json({ message: "Invalid post ID" });
      return;
    }

    const post = await prisma.posts.findUnique({
      where: { id: postId },
      include: { categories: true },
    });

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    // Fetch user data if user_id exists
    let user = null;
    if ((post as any).user_id) {
      user = await prisma.users.findUnique({
        where: { id: String((post as any).user_id) },
        select: {
          id: true,
          name: true,
          username: true,
          profile_pic: true,
        },
      });
    }

    // Format response
    const formattedPost = {
      id: post.id,
      image: post.image,
      category: post.categories?.name,
      title: post.title,
      description: post.description,
      content: post.content,
      date: post.date,
      status_id: post.status_id,
      likes_count: post.likes_count,
      user_id: (post as any).user_id || null,
      users: user,
    };

    res.status(200).json(formattedPost);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({
      message: "Server could not read post because database connection",
    });
  }
};

postRoutes.get("/:postId", getPostById);

// UPDATE a post by ID
const updatePost: AsyncRouteHandler<{ postId: string }, any, PostFormData> = async (req, res) => {
  try {
    const postId = Number(req.params.postId);
    
    if (isNaN(postId)) {
      res.status(400).json({ message: "Invalid post ID" });
      return;
    }

    const {
      title,
      image,
      category_id,
      description,
      content,
      status_id,
      date,
      likes_count,
      user_id,
    } = req.body;

    const post = await prisma.posts.findUnique({ where: { id: postId } });
    if (!post) {
      res
        .status(404)
        .json({ message: "Server could not find a requested post to update" });
      return;
    }

    const updateData: any = {
      title,
      image,
      category_id,
      description,
      content,
      status_id,
      date: new Date(date),
      likes_count,
    };

    // Add user_id if provided
    if (user_id) {
      updateData.user_id = user_id;
    }

    await (prisma.posts as any).update({
      where: { id: postId },
      data: updateData,
    });

    res.status(200).json({ message: "Updated post successfully" });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({
      message: "Server could not update post because database connection",
    });
  }
};

postRoutes.put("/:postId", validatePostInput, updatePost);

// DELETE a post by ID
const deletePost: AsyncRouteHandler<{ postId: string }> = async (req, res) => {
  try {
    const postId = Number(req.params.postId);
    
    if (isNaN(postId)) {
      res.status(400).json({ message: "Invalid post ID" });
      return;
    }

    const post = await prisma.posts.findUnique({ where: { id: postId } });
    if (!post) {
      res
        .status(404)
        .json({ message: "Server could not find a requested post to delete" });
      return;
    }

    await prisma.posts.delete({ where: { id: postId } });
    res.status(200).json({ message: "Deleted post successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({
      message: "Server could not delete post because database connection",
    });
  }
};

postRoutes.delete("/:postId", deletePost);

export default postRoutes;
