import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCertificate,
  FaBook,
  FaUser,
  FaSignOutAlt,
  FaGraduationCap,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = import.meta.env.VITE_BASE_URL;

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [inProgressCourses, setInProgressCourses] = useState([]);
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
        .catch((err) =>
          console.error("Error fetching completed courses:", err)
        );
    }
  }, [userId, token]);

  useEffect(() => {
    if (token) {
      axios
        .get(`${API_URL}/api/progress/my`, {
          headers: { Authorization: token },
        })
        .then((res) => setInProgressCourses(res.data.progress || []))
        .catch((err) => console.error("Error fetching progress:", err));
    }
  }, [token]);

  const handleDownloadCertificate = async (courseId, courseTitle) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/complete-course/generate-certificate`,
        {
          userId,
          courseId,
        },
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

  const handleEmailCertificate = async (courseId, courseTitle) => {
    try {
      await axios.post(
        `${API_URL}/api/complete-course/email-certificate`,
        { userId, courseId },
        { headers: { Authorization: token } }
      );
      alert(`Certificate for ${courseTitle} emailed successfully.`);
    } catch (error) {
      console.error("Certificate email failed:", error?.response?.data || error);
      alert("Failed to email certificate. Please try again later.");
    }
  };

  if (!user) return (
     <div className="text-center py-5 d-flex align-items-center justify-content-center" style={{ minHeight: '80vh', color: 'var(--text-main)' }}>
        <h3>Loading your profile...</h3>
     </div>
  );

  return (
    <div className="container page">
      {/* Profile Header */}
      <motion.div 
        className="card-premium p-5 mb-5 d-flex flex-column flex-md-row align-items-center gap-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex-shrink-0">
          <div
            className="rounded-circle d-flex justify-content-center align-items-center shadow-neon"
            style={{ width: "120px", height: "120px", fontSize: "48px", background: 'var(--gradient-main)', color: 'white' }}
          >
            <FaUser />
          </div>
        </div>

        <div className="text-center text-md-start">
          <div className="badge bg-primary bg-opacity-25 text-primary mb-2 border border-primary border-opacity-25">Learner Profile</div>
          <h2 className="fw-bold mb-1 text-light">{user.username}</h2>
          <p className="text-muted mb-2">{user.email}</p>
          <p className="text-success fw-medium mt-2">
             <span className="me-2">🚀</span> Keep pushing forward — your journey with RDCoders continues!
          </p>
        </div>
      </motion.div>

      {/* Certificates Section */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h3 className="fw-bold mb-0 text-light">
            Continue <span className="text-gradient">Learning</span>
          </h3>
          <span className="text-muted">{inProgressCourses.length} Active</span>
        </div>

        <div className="row g-4 mb-5">
          {inProgressCourses.length > 0 ? (
            inProgressCourses.map((item) => (
              <div key={item._id} className="col-md-6 col-lg-4">
                <div className="card-premium h-100 p-4 d-flex flex-column">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <img
                      src={item.courseId?.thumbnail}
                      alt={item.courseId?.title}
                      className="rounded-3"
                      style={{ width: 60, height: 60, objectFit: "cover" }}
                    />
                    <div>
                      <h6 className="fw-bold text-light mb-1">
                        {item.courseId?.title || "Course"}
                      </h6>
                      <p className="text-muted small mb-0">
                        {item.courseId?.level || "beginner"} level
                      </p>
                    </div>
                  </div>
                  <div className="progress mb-3" style={{ height: 8 }}>
                    <div
                      className="progress-bar"
                      style={{
                        width: item.courseId?.topics?.length
                          ? `${Math.round(
                              (item.completedTopics.length /
                                item.courseId.topics.length) *
                                100
                            )}%`
                          : "0%",
                        background: "var(--gradient-main)",
                      }}
                    ></div>
                  </div>
                  <a
                    href={`/courses/${item.courseId?._id}`}
                    className="btn btn-outline-premium btn-sm mt-auto w-100"
                  >
                    Resume Course
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 py-3 text-center text-muted">
              Start a course to see progress here.
            </div>
          )}
        </div>

        <div className="d-flex align-items-center justify-content-between mb-4">
          <h3 className="fw-bold mb-0 text-light">
             Your <span className="text-gradient">Certificates</span>
          </h3>
          <span className="text-muted">{completedCourses.length} Earned</span>
        </div>

        <div className="row g-4">
          {completedCourses.length > 0 ? (
            completedCourses.map((course, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card-premium h-100 p-4 d-flex flex-column text-center">
                  <div className="mb-3 mx-auto p-3 rounded-circle bg-warning bg-opacity-10 text-warning" style={{ width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <FaGraduationCap size={30} />
                  </div>
                  <h5 className="fw-bold mb-2 text-light">{course.courseTitle}</h5>
                  <p className="text-muted mb-4 small">
                    Issued on: {new Date(course.completionDate).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() =>
                      handleDownloadCertificate(course.courseId, course.courseTitle)
                    }
                    className="btn btn-outline-premium btn-sm mt-auto w-100"
                  >
                    <FaCertificate className="me-2" />
                    Download PDF
                  </button>
                  <button
                    onClick={() =>
                      handleEmailCertificate(course.courseId, course.courseTitle)
                    }
                    className="btn btn-premium btn-sm mt-2 w-100"
                  >
                    Email Certificate
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 py-5 text-center">
               <div className="p-5 rounded-4 border border-dashed border-secondary opacity-50">
                  <p className="fs-5 text-muted mb-0">No completed courses yet. Start learning today!</p>
               </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
