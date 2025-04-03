const express = require('express');
const { createCourse, deleteCourse, updateCourse, getAllCourses, getCourseById } = require('../controllers/courseController');
const courseRoutes = express.Router();

//Add course
courseRoutes.post('/add-course', createCourse);
//Get All course
courseRoutes.get('/get-course', getAllCourses);
//Delete course
courseRoutes.delete('/delete-course/:id', deleteCourse);
//Update course
courseRoutes.put('/update-course/:id', updateCourse);
//Get single course
courseRoutes.get('/get-single-course/:id', getCourseById);

module.exports = courseRoutes;