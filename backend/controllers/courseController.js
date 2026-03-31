const Course = require("../models/courseModel");
const { uploadImage } = require("../config/uploadImage");

// 📌 Create a new course (including topics)
const createCourse = async (req, res) => {
  try {
    const { title, description, author, topics, level, tags, duration, language, status } = req.body;
    const image = req.files?.thumbnail;

    if (!title || !description || !author || !image || !topics) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Upload image to Cloudinary (store in 'courses' folder)
    const thumbnailUrl = await uploadImage(author, image, "courses");

    // Convert topics from JSON string (since form-data can't send arrays directly)
    const parsedTopics = JSON.parse(topics);
    const parsedTags = tags ? (typeof tags === "string" ? JSON.parse(tags) : tags) : [];

    const newCourse = new Course({
      title,
      description,
      author,
      level: level || "beginner",
      tags: parsedTags,
      duration: duration || "",
      language: language || "English",
      status: status || "draft",
      topics: parsedTopics, // Storing topics array
      thumbnail: thumbnailUrl,
    });

    await newCourse.save();
    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    if (error.message === "Cloudinary config missing") {
      return res.status(500).json({ message: "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME in backend/.env." });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};


// 📌 Get all courses
const getAllCourses = async (req, res) => {
  try {
    const { search, level, tag, status, public: publicOnly } = req.query;
    const filters = {};

    if (publicOnly === "1" || publicOnly === "true") {
      filters.status = "published";
    } else if (status) {
      filters.status = status;
    }

    if (level) {
      filters.level = level;
    }

    if (tag) {
      filters.tags = tag;
    }

    if (search) {
      const regex = new RegExp(search, "i");
      filters.$or = [
        { title: regex },
        { description: regex },
        { author: regex },
        { tags: regex },
      ];
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const courses = await Course.find(filters).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Course.countDocuments(filters);

    res.status(200).json({ 
      courses, 
      totalPages: Math.ceil(total / limit), 
      currentPage: page,
      totalCourses: total
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📌 Get a single course by ID
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ course });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, topics, level, tags, duration, language, status } = req.body;
    const image = req.files?.thumbnail;

    // Find the existing course
    const existingCourse = await Course.findById(id);
    if (!existingCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    let updateData = { title, description };

    if (level) updateData.level = level;
    if (duration) updateData.duration = duration;
    if (language) updateData.language = language;
    if (status) updateData.status = status;
    if (tags) {
      updateData.tags = typeof tags === "string" ? JSON.parse(tags) : tags;
    }

    // If a new image is uploaded, replace the old one
    if (image) {
      const newThumbnailUrl = await uploadImage(existingCourse.author, image, "courses");
      updateData.thumbnail = newThumbnailUrl;
    }

    // Handle topics: Merge existing and new topics
    if (topics) {
      const parsedTopics = typeof topics === "string" ? JSON.parse(topics) : topics;
      updateData.topics = [...existingCourse.topics, ...parsedTopics]; // Append new topics
    }

    // Update course
    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error);
    if (error.message === "Cloudinary config missing") {
      return res.status(500).json({ message: "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME in backend/.env." });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📌 Delete a course by ID
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
