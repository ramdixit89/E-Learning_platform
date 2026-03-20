import React from "react";
import { FaUsers, FaAward, FaLaptopCode, FaGlobe, FaCertificate } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="page section-gap">
      <div className="container-tight">
        {/* Hero Section */}
        <div className="text-center mb-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-badge mx-auto">
              <span className="dot"></span>
              Our Mission
            </div>
            <h1 className="hero-title">
              Empowering the next <br />
              <span className="text-gradient">generation of coders</span>
            </h1>
            <p className="hero-sub mx-auto">
              RDCoders is a leading online learning platform that empowers learners
              worldwide with high-quality courses in web development, AI, and more.
              We bridge the gap between theory and real-world application.
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="row g-4 mb-5">
          {[
            { value: "50K+", label: "Active Students" },
            { value: "100+", label: "Expert Instructors" },
            { value: "500+", label: "Video Courses" },
            { value: "99%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <div className="col-6 col-md-3" key={index}>
              <motion.div
                className="stat-card card-glass h-100"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="stat-number mb-2">{stat.value}</div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 500 }}>
                  {stat.label}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <h3 className="font-display text-center mb-4 mt-5">Why Choose <span className="text-gradient">RDCoders</span>?</h3>
        <div className="row justify-content-center g-4">
          {[
            {
              icon: <FaLaptopCode />,
              title: "Practical Learning",
              desc: "Build real-world projects that you can showcase in your portfolio.",
              colorClass: "indigo"
            },
            {
              icon: <FaGlobe />,
              title: "Learn Anywhere",
              desc: "Access our content from any device, anywhere in the world.",
              colorClass: "cyan"
            },
            {
              icon: <FaCertificate />,
              title: "Earn Certificates",
              desc: "Get certified upon completion to boost your resume.",
              colorClass: "amber"
            },
            {
              icon: <FaUsers />,
              title: "Community Driven",
              desc: "Join a thriving community of developers and learners.",
              colorClass: "green"
            },
          ].map((item, index) => (
            <div className="col-md-6" key={index}>
              <motion.div 
                className="card-glass h-100 p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`feature-icon ${item.colorClass}`}>
                  {item.icon}
                </div>
                <h5 className="font-display fw-bold mb-2">{item.title}</h5>
                <p style={{ color: "var(--text-dim)", fontSize: "0.95rem", marginBottom: 0 }}>
                  {item.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
