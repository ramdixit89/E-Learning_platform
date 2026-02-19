const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Course = require("../models/courseModel");

dotenv.config();

const dataPath = path.join(__dirname, "../../courses.json");

const loadCourses = () => {
  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw);
};

const normalizeCourse = (course) => {
  const normalized = { ...course };
  if (normalized._id && normalized._id.$oid) {
    normalized._id = new mongoose.Types.ObjectId(normalized._id.$oid);
  }
  if (normalized.createdAt && normalized.createdAt.$date) {
    normalized.createdAt = new Date(normalized.createdAt.$date);
  }
  return normalized;
};

const seed = async () => {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error("MONGO_URL is not set in environment");
  }

  await mongoose.connect(mongoUrl);
  const courses = loadCourses().map(normalizeCourse);

  await Course.deleteMany({});
  await Course.insertMany(courses);

  console.log(`Seeded ${courses.length} courses.`);
  await mongoose.disconnect();
};

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
