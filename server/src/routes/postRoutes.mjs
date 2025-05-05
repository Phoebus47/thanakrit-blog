import express from "express";
import prisma from "../utils/prisma.mjs";

const postRoutes = express.Router();

postRoutes.post("/", async (req, res) => {
  try {
    const { title, image, category_id, description, content, status_id } =
      req.body;

    if (
      !title ||
      !image ||
      !category_id ||
      !description ||
      !content ||
      !status_id
    ) {
      return res.status(400).json({
        message:
          "Server could not create post because there are missing data from client",
      });
    }

    await prisma.posts.create({
      data: { title, image, category_id, description, content, status_id },
    });

    return res.status(201).json({ message: "Created post successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not create post because database connection",
    });
  }
});

export default postRoutes;
