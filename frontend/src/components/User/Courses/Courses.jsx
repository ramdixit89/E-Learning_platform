import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../User/Auth/css/courses.css"; // Notification scroll styling

const API_URL = import.meta.env.VITE_BASE_URL;

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [notifications] = useState([
    "🎉 New JavaScript course launched!",
    "📢 React Advanced course now live.",
    "🎓 Certificate layout updated.",
    "🔥 Weekend Bootcamp starts soon!",
    "💼 Internship opportunities available.",
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/course/get-course`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="d-flex" style={{ backgroundColor: "#f9f9fb", minHeight: "100vh" }}>
      {/* Main Content */}
      <div className="flex-grow-1 px-4 py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold text-danger display-5">Learn & Grow with RDCoders</h1>
          <p className="text-muted fs-5">
            Unlock your potential with expert-led courses and free certificates.
          </p>
        </div>

        <div className="row justify-content-center">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course._id} className="col-sm-10 col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm border-0 rounded-4 course-card bg-white">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="card-img-top rounded-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between text-center p-4">
                    <div>
                      <h5 className="fw-bold text-dark mb-2">{course.title}</h5>
                      <span className="badge bg-warning text-dark mb-2">
                        🎓 Free Certificate
                      </span>
                      <p
                        className="text-muted small"
                        style={{ minHeight: "70px" }}
                        dangerouslySetInnerHTML={{ __html: course.description }}
                      ></p>
                    </div>
                    <Link
                      to={`/courses/${course._id}`}
                      className="btn btn-gradient mt-3 fw-semibold"
                    >
                      🚀 Start Learning
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No courses available at the moment.</p>
          )}
        </div>

        <div className="text-center mt-5">
          <h4 className="text-secondary">
            💡 Start your learning journey today and earn certificates!
          </h4>
        </div>
      </div>

     {/* Right Sidebar */}
<div
  className="p-3 right-sidebar d-none d-lg-block bg-white shadow-sm border-start"
  style={{
    width: "260px",
    position: "sticky",
    top: 0,
    height: "100vh",
    overflow: "hidden",
    borderLeft: "1px solid #dee2e6",
    zIndex: 10
  }}
  onMouseEnter={() => {
    if (scrollRef.current) scrollRef.current.style.animationPlayState = "paused";
  }}
  onMouseLeave={() => {
    if (scrollRef.current) scrollRef.current.style.animationPlayState = "running";
  }}
>
  <h6 className="fw-bold mb-3 text-success text-center">🔔 Notifications</h6>
  <div
    className="notification-scroll px-2"
    ref={scrollRef}
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      animation: "scroll-vertical 15s linear infinite"
    }}
  >
    {notifications.map((note, idx) => (
      <div
        key={idx}
        className="text-dark fw-semibold border-bottom pb-2"
        style={{ fontSize: "14px" }}
      >
        {note}
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default Courses;
