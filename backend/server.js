const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload'); 
const bodyParser = require('body-parser');
const dbConnection = require('./config/db');
const authRouter = require('./routes/authRoutes');
const { forgotPassword } = require('./controllers/authController');
const courseRoutes = require('./routes/courseRoutes');
const completeCourse = require('./routes/completedCourseRoutes');
const progressRoutes = require('./routes/progressRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const blogRoutes = require('./routes/blogRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
// const postRouter = require('./routes/postRoutes');
dotenv.config();
const app = express();
const port = process.env.PORT;
// CORS policy
app.use(cors());
// Middleware for parsing JSON bodies
app.use(express.json());
// Middleware for parsing URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware for handling file uploads with 5MB size limit to prevent DoS
app.use(fileUpload({ 
    useTempFiles: true, 
    tempFileDir: '/tmp/',
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    abortOnLimit: true
}));
app.use('/uploads', express.static('uploads'));
// Database connection
dbConnection();
// Routes
app.use('/auth', authRouter);
app.use('/api/course', courseRoutes);
app.use('/api/complete-course', completeCourse)
app.use('/api/progress', progressRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/chatbot', chatbotRoutes);
// app.use('/', postRouter);
// Start the server
// Serve frontend
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong on the server."
  });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
