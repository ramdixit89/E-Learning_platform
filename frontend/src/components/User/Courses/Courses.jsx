import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/course/get-course`, {
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with actual token if required
          },
        });
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);
  useEffect(() =>{
    if(!localStorage.getItem('token')){
      navigate('/login');    
    }
  },[]);
  return (
    <div className="container py-5">
      <h2 className="text-center text-primary fw-bold mb-4">Available Courses</h2>
      <div className="row">
        {courses.map((course) => (
          <div key={course._id} className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 rounded">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="card-img-top rounded-top"
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">{course.title}</h5>
                {/* Rendering HTML-formatted description */}
                <p className="text-muted" dangerouslySetInnerHTML={{ __html: course.description }}></p>
                <Link to={`/courses/${course._id}`} className="btn btn-primary">
                  View Course
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
