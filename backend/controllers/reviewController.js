const mongoose = require("mongoose");
const Review = require("../models/reviewModel");

const addReview = async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId } = req.params;
    const { rating, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid courseId" });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const existing = await Review.findOne({ userId, courseId });
    if (existing) {
      existing.rating = rating;
      existing.comment = comment || "";
      await existing.save();
      return res.status(200).json({ review: existing, updated: true });
    }

    const review = await Review.create({
      userId,
      courseId,
      rating,
      comment: comment || "",
    });

    res.status(201).json({ review, updated: false });
  } catch (error) {
    console.error("Add review error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid courseId" });
    }
    const reviews = await Review.find({ courseId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Get reviews error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRatingSummary = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid courseId" });
    }
    const stats = await Review.aggregate([
      { $match: { courseId: new mongoose.Types.ObjectId(courseId) } },
      {
        $group: {
          _id: "$courseId",
          averageRating: { $avg: "$rating" },
          reviewsCount: { $sum: 1 },
        },
      },
    ]);

    if (!stats.length) {
      return res.status(200).json({ averageRating: 0, reviewsCount: 0 });
    }

    res.status(200).json({
      averageRating: Math.round(stats[0].averageRating * 10) / 10,
      reviewsCount: stats[0].reviewsCount,
    });
  } catch (error) {
    console.error("Get rating summary error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addReview, getCourseReviews, getRatingSummary };
