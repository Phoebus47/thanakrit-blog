import { Request, Response, NextFunction } from 'express';

export function validatePostInput(req: Request, res: Response, next: NextFunction): void {
    const { title, image, category_id, description, content, status_id } = req.body;
  
    if (title === undefined) {
        res.status(400).json({ message: "Title is required" });
        return;
    }
    if (typeof title !== "string") {
        res.status(400).json({ message: "Title must be a string" });
        return;
    }
  
    if (image === undefined) {
        res.status(400).json({ message: "Image is required" });
        return;
    }
    if (typeof image !== "string") {
        res.status(400).json({ message: "Image must be a string" });
        return;
    }
  
    if (category_id === undefined) {
        res.status(400).json({ message: "Category ID is required" });
        return;
    }
    if (typeof category_id !== "number") {
        res.status(400).json({ message: "Category ID must be a number" });
        return;
    }
  
    if (description === undefined) {
        res.status(400).json({ message: "Description is required" });
        return;
    }
    if (typeof description !== "string") {
        res.status(400).json({ message: "Description must be a string" });
        return;
    }
  
    if (content === undefined) {
        res.status(400).json({ message: "Content is required" });
        return;
    }
    if (typeof content !== "string") {
        res.status(400).json({ message: "Content must be a string" });
        return;
    }
  
    if (status_id === undefined) {
        res.status(400).json({ message: "Status ID is required" });
        return;
    }
    if (typeof status_id !== "number") {
        res.status(400).json({ message: "Status ID must be a number" });
        return;
    }
  
    next();
}
