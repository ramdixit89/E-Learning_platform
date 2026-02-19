const express = require("express");
const blogRoutes = express.Router();
const {
  createBlog,
  getPublicBlogs,
  getManageBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { verifyToken, optionalAuth } = require("../middleware/authMiddleware");

// Public
blogRoutes.get("/", getPublicBlogs);

// Authenticated
blogRoutes.get("/manage/list", verifyToken, getManageBlogs);
blogRoutes.post("/", verifyToken, createBlog);
blogRoutes.put("/:id", verifyToken, updateBlog);
blogRoutes.delete("/:id", verifyToken, deleteBlog);

// Public (with optional auth for drafts)
blogRoutes.get("/:id", optionalAuth, getBlogById);

module.exports = blogRoutes;
