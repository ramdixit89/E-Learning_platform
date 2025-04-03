const CompletedCourse = require('../models/completedCourse');

// Add a completed course
exports.addCompletedCourse = async (req, res) => {
  try {
    const { userId, courseId, courseTitle } = req.body;

    // Check if the course is already completed
    const existingCourse = await CompletedCourse.findOne({ userId, courseId });
    if (existingCourse) {
      return res.status(400).json({ message: "Course already completed." });
    }

    // Save to database
    const newCompletedCourse = new CompletedCourse({ userId, courseId, courseTitle });
    await newCompletedCourse.save();

    res.status(201).json({ message: "Course marked as completed." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get completed courses for a user
exports.getCompletedCourses = async (req, res) => {
    try {
      const { userId } = req.params;
      // Fetch all completed courses for the user, populate course & user details, sorted by completion date
      const courses = await CompletedCourse.find({ userId })
        .populate("userId", "username email") // Fetch user details (username, email)
        .populate("courseId", "title ") // Fetch course details
        .sort({ completionDate: -1 });
  
      console.log("Fetched completed courses:", courses);
  
      // Check if courses exist
      if (!courses.length) {
        return res.status(404).json({ success: false, message: "No completed courses found for this user." });
      }
  
      res.status(200).json({ success: true, courses });
    } catch (error) {
      console.error("Error fetching completed courses:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  