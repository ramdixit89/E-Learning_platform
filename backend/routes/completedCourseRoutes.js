const express = require("express");
const completeCourse = express.Router();
const { addCompletedCourse, getCompletedCourses } = require("../controllers/completedCourseController");
const { verifyToken } = require("../middleware/authMiddleware");

// Mark course as completed
completeCourse.post("/complete", verifyToken, addCompletedCourse);

// Get completed courses for a user
completeCourse.get("/completed/:userId", verifyToken, getCompletedCourses);

module.exports = completeCourse;
