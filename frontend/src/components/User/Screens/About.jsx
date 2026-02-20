import React from "react";
import { FaUsers, FaAward } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="container page text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="fw-bold mb-4 display-5">
          About <span className="text-gradient">Us</span>
        </h2>
        <p className="text-muted px-lg-5 mx-lg-5 mb-5 fs-5">
          RDCoders is a leading online learning platform that empowers learners
          worldwide with high-quality courses in web development, AI, and more.
          We bridge the gap between theory and real-world application.
        </p>
      </motion.div>
      
      <div className="row justify-content-center g-4 mt-4">
        {[
          {
            icon: <FaUsers className="text-primary fs-1" />,
            title: "50K+ Students",
            desc: "Joined our community to learn and grow together."
          },
          {
            icon: <FaAward className="text-warning fs-1" />,
            title: "Top-Rated Instructors",
            desc: "Learn from industry experts with real experience."
          },
        ].map((item, index) => (
          <motion.div 
            className="col-md-6" 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="card-premium h-100 p-5 d-flex flex-column align-items-center justify-content-center">
              <div className="mb-4 d-inline-flex align-items-center justify-content-center rounded-circle bg-light bg-opacity-10 p-4" style={{ width: 80, height: 80 }}>
                {item.icon}
              </div>
              <h4 className="fw-bold text-light mb-2">{item.title}</h4>
              <p className="text-muted">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
