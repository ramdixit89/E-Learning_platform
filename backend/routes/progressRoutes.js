const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  enrollCourse,
  getProgress,
  updateProgress,
  getMyProgress,
} = require("../controllers/progressController");

const progressRoutes = express.Router();

progressRoutes.post("/enroll", verifyToken, enrollCourse);
progressRoutes.get("/my", verifyToken, getMyProgress);
progressRoutes.get("/:courseId", verifyToken, getProgress);
progressRoutes.patch("/:courseId", verifyToken, updateProgress);

module.exports = progressRoutes;
