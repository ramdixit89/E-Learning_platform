import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCertificate, FaBook, FaUser, FaSignOutAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
const API_URL = import.meta.env.VITE_BASE_URL;
const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [completedCourses, setCompletedCourses] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId && token) {
      axios
        .get(`${API_URL}/auth/singleUser/${userId}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId, token]);

  useEffect(() => {
    if (userId && token) {
      axios
        .get(`${API_URL}/api/complete-course/completed/${userId}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setCompletedCourses(response.data.courses || []);
        })
        .catch((error) => {
          console.error("Error fetching completed courses:", error);
        });
    }
  }, [userId, token]);

  const certificates = [
    { course: "React for Beginners", date: "March 16, 2025", url: "#" },
    { course: "Advanced JavaScript", date: "April 11, 2025", url: "#" },
  ];

  if (!user) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="dashboard-container d-flex">
      {/* Sidebar */}
      <div className="sidebar bg-dark text-white p-4">
        <h3 className="text-center mb-4">User Dashboard</h3>
        <ul className="nav flex-column">
          <li className="nav-item py-2 d-flex align-items-center">
            <FaUser className="me-2" /> Profile
          </li>
          <li className="nav-item py-2 d-flex align-items-center">
            <FaBook className="me-2" /> My Courses
          </li>
          <li className="nav-item py-2 d-flex align-items-center">
            <FaCertificate className="me-2" /> Certificates
          </li>
          <li className="nav-item py-2 d-flex align-items-center mt-4 text-danger">
            <FaSignOutAlt className="me-2" /> Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content p-4 w-100">
        <div className="card shadow p-4 border-0 mb-4 text-center">
          <h2 className="fw-bold">Welcome, {user.username}!</h2>
          <p className="text-muted">{user.email}</p>
        </div>

        {/* Completed Courses
        <div className="section">
          <h4 className="fw-bold">Completed Courses</h4>
          <ul className="list-group mb-4">
            {completedCourses.length > 0 ? (
              completedCourses.map((course, index) => (
                <li key={index} className="list-group-item shadow-sm border-0 p-3">
                  <strong>{course.courseTitle}</strong> - {new Date(course.completionDate).toLocaleDateString()}
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">No completed courses found.</li>
            )}
          </ul>
        </div> */}

        {/* Certificates */}
        <div className="section">
          <h4 className="fw-bold text-center">Course Completed by <span className="text-muted">{user.username}</span></h4>
          <div className="row">
            {completedCourses.map((certificate, index) => (
              <div key={index} className="col-md-4 mb-3">
                <div className="card shadow-sm border-0 p-3 text-center">
                  <h5 className="fw-bold">{certificate.courseTitle}</h5>
                  <p className="text-muted">Issued on: {new Date(certificate.completionDate).toLocaleDateString()}</p>
                  <a href={certificate.url} className="btn btn-success w-100">
                    <FaCertificate className="me-2" /> Download Certificate
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
