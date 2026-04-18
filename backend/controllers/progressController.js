const mongoose = require("mongoose");
const CourseProgress = require("../models/courseProgress");

const enrollCourse = async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "courseId is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid courseId" });
    }

    const existing = await CourseProgress.findOne({ userId, courseId });
    if (existing) {
      return res.status(200).json({ progress: existing });
    }

    const progress = await CourseProgress.create({ userId, courseId });
    return res.status(201).json({ progress });
  } catch (error) {
    console.error("Enroll course error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid courseId" });
    }

    const progress = await CourseProgress.findOne({ userId, courseId });
    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    res.status(200).json({ progress });
  } catch (error) {
    console.error("Get progress error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid courseId" });
    }
    const { currentTopicIndex, completedTopicIndex, isCompleted, quizScore, quizTotal } = req.body;

    const progress = await CourseProgress.findOne({ userId, courseId });
    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    if (Number.isInteger(completedTopicIndex)) {
      if (!progress.completedTopics.includes(completedTopicIndex)) {
        progress.completedTopics.push(completedTopicIndex);
      }
    }

    if (Number.isInteger(currentTopicIndex)) {
      progress.currentTopicIndex = currentTopicIndex;
    }

    if (typeof isCompleted === "boolean") {
      progress.isCompleted = isCompleted;
    }

    if (typeof quizScore === "number" && typeof quizTotal === "number") {
      progress.quizScores.push({ score: quizScore, total: quizTotal });
    }

    await progress.save();
    res.status(200).json({ progress });
  } catch (error) {
    console.error("Update progress error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMyProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const progress = await CourseProgress.find({ userId })
      .populate("courseId", "title thumbnail topics level tags")
      .sort({ updatedAt: -1 });

    res.status(200).json({ progress });
  } catch (error) {
    console.error("Get my progress error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { enrollCourse, getProgress, updateProgress, getMyProgress };
