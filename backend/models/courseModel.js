const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String, // Supports rich text (HTML format)
    required: true,
  },
  author: {
    type: String,
    // ref: "users", // Reference to User Model
    required: true,
  },
  level: {
    type: String,
    trim: true,
    default: "beginner",
  },
  tags: {
    type: [String],
    default: [],
  },
  duration: {
    type: String,
    trim: true,
    default: "",
  },
  language: {
    type: String,
    trim: true,
    default: "English",
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  topics: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true }, // Supports HTML content
      videoUrl: { type: String, default: "" },
      resources: {
        type: [
          {
            title: { type: String, default: "" },
            url: { type: String, default: "" },
          },
        ],
        default: [],
      },
    },
  ],
  thumbnail: {
    type: String, // Cloudinary or image URL
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
