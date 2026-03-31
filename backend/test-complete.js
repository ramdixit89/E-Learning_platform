const mongoose = require("mongoose");
const CompletedCourse = require("./models/completedCourse");
const User = require("./models/userModel");
const Course = require("./models/courseModel");
const dbConnection = require('./config/db');
require('dotenv').config();

async function run() {
  await dbConnection();
  
  // Find a user and a course
  const user = await User.findOne();
  const course = await Course.findOne();
  if(!user || !course) return console.log("Missing user or course");

  const userId = user._id;
  const courseId = course._id;
  const courseTitle = course.title;

  console.log("Found User ID:", userId);
  console.log("Found Course ID:", courseId);

  // Mark as completed
  await CompletedCourse.updateOne(
    { userId, courseId },
    { $set: { userId, courseId, courseTitle } },
    { upsert: true }
  );

  console.log("Inserted CompletedCourse.");

  // Test certificate generator by simulating request
  const http = require("http");
  const jwt = require("jsonwebtoken");
  
  const token = jwt.sign({ userId, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });

  const fetch = global.fetch; // Node 18+ has fetch
  const res = await fetch('http://localhost:5000/api/complete-course/generate-certificate', {
    method: "POST",
    body: JSON.stringify({ userId: userId.toString(), courseId: courseId.toString() }),
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (res.ok) {
    const buffer = await res.arrayBuffer();
    console.log("Success! PDF size:", buffer.byteLength);
  } else {
    const text = await res.text();
    console.log("Failed API HTTP Error:", res.status, text);
  }
  process.exit(0);
}

run();
