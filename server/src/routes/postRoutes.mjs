import { Router } from "express";
import prisma from "../utils/prisma.mjs";
import { validatePostInput } from "../middlewares/postValidation.mjs";

const postRoutes = Router();

// CREATE a new post
postRoutes.post("/", validatePostInput, async (req, res) => {
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
    } = req.body;

    if (
      !title ||
      !image ||
      !category_id ||
      !description ||
      !content ||
      !status_id ||
      !date
    ) {
      return res.status(400).json({
        message:
          "Server could not create post because there are missing data from client",
      });
    }

    await prisma.posts.create({
      data: {
        title,
        image,
        category_id,
        description,
        content,
        status_id,
        date,
        likes_count: likes_count || 0,
      },
    });

    return res.status(201).json({ message: "Created post successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not create post because database connection",
    });
  }
});

// GET all posts with filtering and pagination
postRoutes.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 6, category, keyword } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // สร้าง where condition
    const where = {};

    if (category && category !== "Highlight") {
      where.category_id = parseInt(category);
    }

    if (keyword) {
      where.OR = [
        { title: { contains: keyword, mode: "insensitive" } },
        { description: { contains: keyword, mode: "insensitive" } },
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

    // Count total posts
    const totalPosts = await prisma.posts.count({ where });
    const totalPages = Math.ceil(totalPosts / take);
    const hasMore = page < totalPages;

    // Format response
    const formattedPosts = posts.map((post) => ({
      id: post.id,
      image: post.image,
      category: post.categories?.name,
      title: post.title,
      description: post.description,
      content: post.content,
      date: post.date,
      status_id: post.status_id,
      likes_count: post.likes_count,
    }));

    return res.status(200).json({
      posts: formattedPosts,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        hasMore,
        totalPosts,
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({
      message: "Server could not read posts because database connection",
    });
  }
});

// GET single post by ID
postRoutes.get("/:postId", async (req, res) => {
  try {
    const postId = Number(req.params.postId);
    const post = await prisma.posts.findUnique({
      where: { id: postId },
      include: { categories: true },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
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
    };

    return res.status(200).json(formattedPost);
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({
      message: "Server could not read post because database connection",
    });
  }
});

// UPDATE a post by ID
postRoutes.put("/:postId", validatePostInput, async (req, res) => {
  try {
    const postId = Number(req.params.postId);
    const {
      title,
      image,
      category_id,
      description,
      content,
      status_id,
      date,
      likes_count,
    } = req.body;

    const post = await prisma.posts.findUnique({ where: { id: postId } });
    if (!post) {
      return res
        .status(404)
        .json({ message: "Server could not find a requested post to update" });
    }

    await prisma.posts.update({
      where: { id: postId },
      data: {
        title,
        image,
        category_id,
        description,
        content,
        status_id,
        date,
        likes_count,
      },
    });

    return res.status(200).json({ message: "Updated post sucessfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not update post because database connection",
    });
  }
});

// DELETE a post by ID
postRoutes.delete("/:postId", async (req, res) => {
  try {
    const postId = Number(req.params.postId);
    const post = await prisma.posts.findUnique({ where: { id: postId } });
    if (!post) {
      return res
        .status(404)
        .json({ message: "Server could not find a requested post to delete" });
    }

    await prisma.posts.delete({ where: { id: postId } });
    return res.status(200).json({ message: "Deleted post sucessfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not delete post because database connection",
    });
  }
});

export default postRoutes;
