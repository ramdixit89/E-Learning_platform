import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
const AllCourse = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/course/get-course`, {
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with actual token
          },
        });
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/course/delete-course/${id}`, {
        headers: {
          Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with actual token
        },
      });
      setCourses(courses.filter(course => course.id !== id));
      alert("Course deleted successfully");
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course");
    }
  };
  const handleUpdate = (id) => {
    navigate(`/admin/edit-course/${id}`);
  };
  return (
    <div className="container mt-4">
      <h2 className="mb-3">All Courses</h2>
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4 mb-4" key={course._id}>
            <div className="card shadow-sm border-0">
            <img className="img-fluid rounded" src={course.thumbnail} alt="" /> 
              <div className="card-body">
                <h5 className="card-title fw-bold">{course.title}</h5>
                <p className="card-text">
                  <strong>Author:</strong> {course.author}
                </p>
                <p className="text-muted">
                  <small>Uploaded At: {new Date(course.createdAt).toLocaleDateString()}</small>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary btn-sm" onClick={() => handleUpdate(course._id)}>Update</button>
                  <button className="btn btn-warning btn-sm">Read</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(course._id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourse;
