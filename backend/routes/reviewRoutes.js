const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const {
  addReview,
  getCourseReviews,
  getRatingSummary,
} = require("../controllers/reviewController");

const reviewRoutes = express.Router();

reviewRoutes.get("/:courseId/summary", getRatingSummary);
reviewRoutes.get("/:courseId", getCourseReviews);
reviewRoutes.post("/:courseId", verifyToken, addReview);

module.exports = reviewRoutes;
