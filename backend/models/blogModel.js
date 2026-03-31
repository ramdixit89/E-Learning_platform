const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  content: {
    type: String, // Rich text HTML
    required: true,
  },
  excerpt: {
    type: String,
    default: "",
  },
  tags: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    default: "Tech",
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  authorName: {
    type: String,
    default: "",
  },
  coverImage: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

blogSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

blogSchema.index({ status: 1, createdAt: -1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ category: 1 });

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
