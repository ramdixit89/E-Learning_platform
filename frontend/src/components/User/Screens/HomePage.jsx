import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import {
  FaBook,
  FaCertificate,
  FaChalkboardTeacher,
  FaUsers,
  FaRocket,
  FaLaptopCode,
} from "react-icons/fa";
import "./css/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const startLearn = () =>{
       navigate('/courses');
  }
  return (
    <div className="homepage position-relative">
      {/* Top Wave SVG */}
      <div className="wave-top">
        <svg viewBox="0 0 1440 320">
          <path
            fill="rgba(255, 99, 132, 0.3)"
            fillOpacity="1"
            d="M0,160L40,154.7C80,149,160,139,240,133.3C320,128,400,128,480,133.3C560,139,640,149,720,165.3C800,181,880,203,960,192C1040,181,1120,139,1200,138.7C1280,139,1360,181,1400,202.7L1440,224V0H0Z"
          ></path>
        </svg>
      </div>

      {/* Floating Blobs */}
      <div className="floating-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Hero Section */}
      <div className="hero-section text-center py-5 bg-gradient position-relative">
        <h1 className="display-4 fw-bold text-dark">
          Welcome to <span className="text-danger">RDCoders </span>
        </h1>
        <p className="lead fw-semibold text-dark">
          Empower your future with expert-led training and real-world projects.
        </p>
        <button onClick={() => startLearn()} className="btn btn-danger mt-3 px-4 py-2 fw-bold shadow">
          Start Learning Now <FaRocket className="ms-2" />
        </button>
      </div>

      {/* Features Section */}
      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">
          Why Choose <span className="text-danger">RDCoders</span>?
        </h2>
        <div className="row text-center">
          {[
            {
              icon: <FaBook className="text-primary fs-1" />, title: "Wide Range of Courses", text: "Explore in-demand skills in web development, AI, and more."
            },
            {
              icon: <FaCertificate className="text-success fs-1" />, title: "Recognized Certifications", text: "Boost your resume with validated certificates."
            },
            {
              icon: <FaChalkboardTeacher className="text-warning fs-1" />, title: "Expert Mentors", text: "Get mentored by professionals working in top tech companies."
            },
            {
              icon: <FaUsers className="text-danger fs-1" />, title: "Active Community", text: "Engage in live discussions, forums, and webinars."
            }
          ].map((feature, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card border-0 shadow-lg p-4 h-100 transition-hover">
                <div className="d-flex justify-content-center align-items-center bg-light rounded-circle p-3 mb-3" style={{ width: "80px", height: "80px", margin: "auto" }}>
                  {feature.icon}
                </div>
                <h5 className="fw-bold">{feature.title}</h5>
                <p className="text-muted">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Courses Section */}
      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">Popular Courses</h2>
        <div className="row">
          {["Frontend Development", "Backend with Node.js", "AI for Beginners"].map((title, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-lg border-0 h-100 transition-hover">
                <div className="card-body text-center p-4">
                  <FaLaptopCode className="text-danger fs-1 mb-3" />
                  <h5 className="fw-bold">{title}</h5>
                  <p className="text-muted">
                    Learn {title.toLowerCase()} through real-world projects and expert-led lessons.
                  </p>
                  <button className="btn btn-danger fw-bold">
                    View Course <span className="ms-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave SVG */}
      <div className="wave-bottom">
        <svg viewBox="0 0 1440 320">
          <path
            fill="rgba(54, 162, 235, 0.3)"
            fillOpacity="1"
            d="M0,288L40,266.7C80,245,160,203,240,181.3C320,160,400,160,480,181.3C560,203,640,245,720,261.3C800,277,880,267,960,245.3C1040,224,1120,192,1200,170.7C1280,149,1360,139,1400,138.7L1440,138V320H0Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HomePage;
