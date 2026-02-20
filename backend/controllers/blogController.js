const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const { uploadImage } = require("../config/uploadImage");

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const createExcerpt = (html, maxLength = 180) => {
  const plain = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength).trim()}...`;
};

const generateUniqueSlug = async (title, excludeId = null) => {
  const base = slugify(title);
  let slug = base;
  let counter = 1;
  // Ensure uniqueness
  while (
    await Blog.findOne({
      slug,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    })
  ) {
    slug = `${base}-${counter}`;
    counter += 1;
  }
  return slug;
};

const createBlog = async (req, res) => {
  try {
    const { title, content, tags, category, status, excerpt } = req.body;
    const image = req.files?.coverImage;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const author = await User.findById(req.userId).select("username");
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    const slug = await generateUniqueSlug(title);
    const parsedTags = tags ? (typeof tags === "string" ? JSON.parse(tags) : tags) : [];

    let coverImageUrl = "";
    if (image) {
      coverImageUrl = await uploadImage(req.userId, image, "blogs");
    }

    const newBlog = new Blog({
      title,
      slug,
      content,
      excerpt: excerpt || createExcerpt(content),
      tags: parsedTags,
      category: category || "Tech",
      status: status || "draft",
      author: req.userId,
      authorName: author.username,
      coverImage: coverImageUrl,
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    if (error.message === "Cloudinary config missing") {
      return res.status(500).json({ message: "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME in backend/.env." });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPublicBlogs = async (req, res) => {
  try {
    const { search, tag } = req.query;
    const filters = { status: "published" };

    if (tag) {
      filters.tags = tag;
    }

    if (search) {
      const regex = new RegExp(search, "i");
      filters.$or = [
        { title: regex },
        { content: regex },
        { authorName: regex },
        { tags: regex },
      ];
    }

    const blogs = await Blog.find(filters).sort({ createdAt: -1 });
    res.status(200).json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getManageBlogs = async (req, res) => {
  try {
    const { search, tag, status, mine } = req.query;
    const filters = {};

    if (status) {
      filters.status = status;
    }

    if (tag) {
      filters.tags = tag;
    }

    if (search) {
      const regex = new RegExp(search, "i");
      filters.$or = [
        { title: regex },
        { content: regex },
        { authorName: regex },
        { tags: regex },
      ];
    }

    if (req.userRole !== "admin" || mine === "1" || mine === "true") {
      filters.author = req.userId;
    }

    const blogs = await Blog.find(filters).sort({ createdAt: -1 });
    res.status(200).json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.status !== "published") {
      if (!req.userId) {
        return res.status(401).json({ message: "Login required to view this blog" });
      }
      const isOwner = blog.author.toString() === req.userId;
      if (!isOwner && req.userRole !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }
    }

    res.status(200).json({ blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags, category, status, excerpt } = req.body;
    const image = req.files?.coverImage;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const isOwner = blog.author.toString() === req.userId;
    if (!isOwner && req.userRole !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const updateData = {};
    if (title && title !== blog.title) {
      updateData.title = title;
      updateData.slug = await generateUniqueSlug(title, blog._id);
    }
    if (content) {
      updateData.content = content;
      updateData.excerpt = excerpt || createExcerpt(content);
    }
    if (tags) {
      updateData.tags = typeof tags === "string" ? JSON.parse(tags) : tags;
    }
    if (category) updateData.category = category;
    if (status) updateData.status = status;

    if (image) {
      const coverImageUrl = await uploadImage(req.userId, image, "blogs");
      updateData.coverImage = coverImageUrl;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    if (error.message === "Cloudinary config missing") {
      return res.status(500).json({ message: "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME in backend/.env." });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const isOwner = blog.author.toString() === req.userId;
    if (!isOwner && req.userRole !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createBlog,
  getPublicBlogs,
  getManageBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
