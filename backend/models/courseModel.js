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
  quizzes: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true },
      explanation: { type: String, required: true }
    }
  ],
  interviewQuestions: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true }
    }
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

courseSchema.index({ status: 1, createdAt: -1 });
courseSchema.index({ level: 1 });
courseSchema.index({ tags: 1 });
courseSchema.index({ title: "text", description: "text", author: "text", tags: "text" });

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
