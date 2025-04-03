import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaCheckCircle, FaUsers, FaAward } from "react-icons/fa";
const About = () => {
  return (
    <div className="container my-5 text-center">
      <h2 className="fw-bold mb-4">
        About <span className="text-danger">Us</span>
      </h2>
      <p className="text-muted px-5">
        RDCoders is a leading online learning platform that empowers learners
        worldwide with high-quality courses in web development, AI, and more.
        Our mission is to bridge the gap between knowledge and application
        through interactive, hands-on learning experiences.
      </p>
      <div className="row mt-4">
        {[
          {
            icon: <FaUsers className="text-primary fs-1" />,
            title: "50K+ Students",
          },
          {
            icon: <FaAward className="text-warning fs-1" />,
            title: "Top-Rated Instructors",
          },
        ].map((item, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card shadow-lg border-0 p-4 h-100 transition-hover">
              <div className="mb-3">{item.icon}</div>
              <h5 className="fw-bold">{item.title}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
