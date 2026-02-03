import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// Removed explicit CSS import to rely on global styles

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
    <div className="d-flex flex-column flex-lg-row" style={{ minHeight: "100vh", paddingTop: '80px' }}>
      {/* Main Content */}
      <div className="flex-grow-1 px-4 py-5 container">
        <div className="text-center mb-5">
          <h1 className="fw-bold display-5 mb-3">
            Learn & Grow with <span className="text-gradient">RDCoders</span>
          </h1>
          <p className="text-muted fs-5">
            Unlock your potential with expert-led courses and free certificates.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course._id} className="col-md-6 col-lg-4">
                <div className="card-premium h-100 p-0 overflow-hidden d-flex flex-column">
                  <div className="position-relative">
                     <img
                       src={course.thumbnail}
                       alt={course.title}
                       className="w-100"
                       style={{ height: "200px", objectFit: "cover" }}
                     />
                     <div className="position-absolute bottom-0 start-0 w-100 h-50 bg-gradient-to-t from-dark to-transparent" style={{ background: 'linear-gradient(to top, rgba(15, 23, 42, 1), transparent)' }}></div>
                  </div>
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <h5 className="fw-bold text-light mb-2">{course.title}</h5>
                    <div className="mb-3">
                       <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-20 rounded-pill px-3 py-1">
                        🎓 Free Certificate
                      </span>
                    </div>
                    
                    <div
                      className="text-muted small mb-4 line-clamp-3"
                      style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
                      dangerouslySetInnerHTML={{ __html: course.description }}
                    ></div>
                    
                    <div className="mt-auto">
                      <Link
                        to={`/courses/${course._id}`}
                        className="btn btn-premium w-100 justify-content-center"
                      >
                        🚀 Start Learning
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
             // Show skeletons or empty state
             <div className="col-12 text-center text-muted py-5">
               <p className="fs-5">Loading courses or no courses available...</p>
             </div>
          )}
        </div>
      </div>

     {/* Right Sidebar */}
     <div
       className="d-none d-lg-block p-4"
       style={{
         width: "300px",
         minWidth: "300px",
         borderLeft: "1px solid var(--glass-border)",
         background: 'var(--surface)',
       }}
     >
      <div className="sticky-top" style={{ top: '100px' }}>
        <h6 className="fw-bold mb-4 text-primary d-flex align-items-center gap-2">
          <span>🔔</span> Live Notifications
        </h6>
        <div
          className="d-flex flex-column gap-3"
          onMouseEnter={() => {
             // Optional: visual pause indication
          }}
        >
          {notifications.map((note, idx) => (
            <div
              key={idx}
              className="p-3 rounded-3 bg-glass border border-secondary"
              style={{ borderColor: 'var(--glass-border)' }}
            >
              <p className="mb-0 text-sm text-light">{note}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-5 p-4 rounded-3 text-center" style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--accent))' }}>
           <h6 className="text-white fw-bold mb-2">Upgrade to Pro</h6>
           <p className="text-white text-opacity-75 small mb-3">Get unlimited access to all premium courses.</p>
           <button className="btn btn-light btn-sm fw-bold text-primary w-100">Upgrade Now</button>
        </div>
      </div>
     </div>
    </div>
  );
};

export default Courses;
