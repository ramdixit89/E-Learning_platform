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
  topics: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true }, // Supports HTML content
    },
  ],
  thumbnail: {
    type: String, // Cloudinary or image URL
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
