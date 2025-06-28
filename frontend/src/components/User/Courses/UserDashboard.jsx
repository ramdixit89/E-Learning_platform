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
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [userId, token]);

  useEffect(() => {
    if (userId && token) {
      axios
        .get(`${API_URL}/api/complete-course/completed/${userId}`, {
          headers: { Authorization: token },
        })
        .then((res) => setCompletedCourses(res.data.courses || []))
        .catch((err) => console.error("Error fetching completed courses:", err));
    }
  }, [userId, token]);

  const handleDownloadCertificate = async (courseId, courseTitle) => {
    try {
      console.log("User id", userId);
      console.log("course Id ", courseId);
      console.log("course title ", courseTitle);
      const response = await axios.post(
        `${API_URL}/api/complete-course/generate-certificate`,
        { userId : user._id, courseId },
        {
          headers: { Authorization: token },
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${courseTitle}_certificate.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Certificate download failed:", error?.response?.data || error);
      alert("Failed to download certificate. Please try again later.");
    }
  };

  if (!user) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className="bg-dark text-white p-4" style={{ width: "250px" }}>
        <h4 className="text-center mb-5">🎓 RDCoders</h4>
        <ul className="nav flex-column gap-3">
          <li className="nav-item">
            <span className="nav-link text-white d-flex align-items-center gap-2">
              <FaUser /> Profile
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link text-white d-flex align-items-center gap-2">
              <FaBook /> My Courses
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link text-white d-flex align-items-center gap-2">
              <FaCertificate /> Certificates
            </span>
          </li>
          <li className="nav-item mt-4">
            <span className="nav-link text-danger d-flex align-items-center gap-2">
              <FaSignOutAlt /> Logout
            </span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">
        <div className="card p-4 shadow-sm border-0 mb-4 bg-white">
          <h2 className="fw-bold mb-1">Welcome, {user.username}!</h2>
          <p className="text-muted mb-0">{user.email}</p>
        </div>

        <div className="mb-4">
          <h4 className="fw-bold text-center mb-4">
            🎉 Certificates earned by <span className="text-primary">{user.username}</span>
          </h4>

          <div className="row">
            {completedCourses.length > 0 ? (
              completedCourses.map((course, index) => (
                <div key={index} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 shadow-sm border-0">
                    <div className="card-body text-center">
                      <h5 className="fw-bold">{course.courseTitle}</h5>
                      <p className="text-muted">
                        Issued on: {new Date(course.completionDate).toLocaleDateString()}
                      </p>
                      <button
                        onClick={() => handleDownloadCertificate(course._id, course.courseTitle)}
                        className="btn btn-success w-100 mt-3"
                      >
                        <FaCertificate className="me-2" />
                        Download Certificate
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">No completed courses found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
