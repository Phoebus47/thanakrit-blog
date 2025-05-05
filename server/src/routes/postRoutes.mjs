import express from "express";
import prisma from "../utils/prisma.mjs";

const postRoutes = express.Router();

postRoutes.post("/", async (req, res) => {
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

postRoutes.get("/:postId", async (req, res) => {
  try {
    const postId = Number(req.params.postId);
    const post = await prisma.posts.findUnique({
      where: { id: postId },
      include: { categories: true },
    });

    if (!post) {
      return res
        .status(404)
        .json({ message: "Server could not find a requested post" });
    }

    return res.status(200).json({
      id: post.id,
      image: post.image,
      category: post.categories?.name,
      title: post.title,
      description: post.description,
      content: post.content,
      date: post.date,
      status_id: post.status_id,
      likes_count: post.likes_count,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read post because database connection",
    });
  }
});

postRoutes.put("/:postId", async (req, res) => {
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

postRoutes.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const category = req.query.category;
    const keyword = req.query.keyword;

    const where = {};

    if (category) {
      where.category_id = Number(category);
    }

    if (keyword) {
      where.OR = [
        { title: { contains: keyword, mode: "insensitive" } },
        { description: { contains: keyword, mode: "insensitive" } },
        { content: { contains: keyword, mode: "insensitive" } },
      ];
    }

    const totalPosts = await prisma.posts.count({ where });
    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await prisma.posts.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: { categories: true },
      orderBy: { date: "desc" },
    });

    return res.status(200).json({
      totalPosts,
      totalPages,
      currentPage: page,
      limit,
      posts: posts.map((post) => ({
        id: post.id,
        image: post.image,
        category: post.categories?.name,
        title: post.title,
        description: post.description,
        content: post.content,
        date: post.date,
        status_id: post.status_id,
        likes_count: post.likes_count,
      })),
      nextPage: page < totalPages ? page + 1 : null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server could not read post because database connection",
    });
  }
});

export default postRoutes;
