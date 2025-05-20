// src/routes/blog.routes.js
import { Router } from "express";
import { createBlog, getAllBlogs } from "../controllers/blog.controller.js";

const router = Router();

router.post("/", createBlog);
router.get("/", getAllBlogs);

export default router;
