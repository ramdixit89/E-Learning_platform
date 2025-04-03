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
// Middleware for handling file uploads
// app.use(fileUpload());
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
// Custom middleware to check for file uploads
app.use((req, res, next) => {
  if (req.is('multipart/form-data') && (!req.files || Object.keys(req.files).length === 0)) {
    return res.status(400).json({ message: "No files were uploaded." });
  }
  next();
});
app.use('/uploads', express.static('uploads'));
// Database connection
dbConnection();
// Routes
app.use('/auth', authRouter);
app.use('/api/course', courseRoutes);
app.use('/api/complete-course', completeCourse)
// app.use('/', postRouter);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
