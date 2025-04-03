const Course = require("../models/courseModel");
const { uploadImage } = require("../config/uploadImage");

// 📌 Create a new course (including topics)
const createCourse = async (req, res) => {
  try {
    const { title, description, author, topics } = req.body;
    const image = req.files?.thumbnail;

    if (!title || !description || !author || !image || !topics) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Upload image to Cloudinary (store in 'courses' folder)
    const thumbnailUrl = await uploadImage(author, image, "courses");

    // Convert topics from JSON string (since form-data can't send arrays directly)
    const parsedTopics = JSON.parse(topics);

    const newCourse = new Course({
      title,
      description,
      author,
      topics: parsedTopics, // Storing topics array
      thumbnail: thumbnailUrl,
    });

    await newCourse.save();
    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// 📌 Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("author", "name email");
    res.status(200).json({ courses });
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
    const { title, description, topics } = req.body;
    const image = req.files?.thumbnail;

    // Find the existing course
    const existingCourse = await Course.findById(id);
    if (!existingCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    let updateData = { title, description };

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
