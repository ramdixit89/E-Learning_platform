import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaArrowRight, FaCertificate, FaPlayCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = import.meta.env.VITE_BASE_URL;

const SingleCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [certificateGenerated, setCertificateGenerated] = useState(false);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/course/get-single-course/${id}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setCourse(response.data.course);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id, certificateGenerated]);

  if (!course) {
    return (
      <div className="text-center py-5 d-flex align-items-center justify-content-center" style={{ minHeight: '80vh', color: 'var(--text-main)' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h3>Loading course content...</h3>
        </motion.div>
      </div>
    );
  }

  const topics = course.topics || [];
  const progress = ((currentTopicIndex + 1) / topics.length) * 100;

  const handleNext = async () => {
    if (currentTopicIndex < topics.length - 1) {
      setCurrentTopicIndex((prev) => prev + 1);
    } else {
      setCertificateGenerated(true);
      try {
        await axios.post(
          `${API_URL}/api/complete-course/complete`,
          {
            userId: localStorage.getItem("userId"),
            courseId: course._id,
            courseTitle: course.title,
          },
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        console.log("Course marked as completed.");
      } catch (error) {
        console.error("Error marking course as completed:", error.response?.data);
      }
    }
  };

  const handlePrevious = () => {
    if (currentTopicIndex > 0) {
      setCurrentTopicIndex((prev) => prev - 1);
    }
  };

  const handleDownloadCertificate = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/complete-course/generate-certificate`,
        {
          userId: localStorage.getItem("userId"),
          courseId: course._id,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${course.title}_certificate.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading certificate:", error.response?.data || error);
    }
  };

  return (
    <div className="container py-5" style={{ paddingTop: '100px' }}>
      {/* Course Header */}
      <motion.div 
        className="row align-items-center mb-5 g-5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="col-lg-5">
           <div className="position-relative fw-bold text-center rounded-4 overflow-hidden shadow-lg border border-secondary" style={{ borderColor: 'var(--glass-border)' }}>
             <img
               src={course.thumbnail}
               alt={course.title}
               className="img-fluid"
               style={{ width: '100%', objectFit: "cover" }}
             />
             <div className="position-absolute top-50 start-50 translate-middle">
                <FaPlayCircle size={60} className="text-white opacity-75 drop-shadow" />
             </div>
           </div>
        </div>
        <div className="col-lg-7">
          <div className="d-inline-block px-3 py-1 rounded-pill bg-primary bg-opacity-25 text-primary fw-bold mb-3 fs-7 border border-primary border-opacity-25">
             Course
          </div>
          <h1 className="display-5 fw-bold mb-3">{course.title}</h1>
          <p className="text-muted fs-5 mb-4" dangerouslySetInnerHTML={{ __html: course.description }}></p>
          
          <div className="d-flex align-items-center gap-4">
            <span className="badge bg-success rounded-pill px-4 py-2 fs-6">
               {topics.length} Topics
            </span>
            <div className="d-flex align-items-center gap-2">
               <div className="progress w-100" style={{ height: "8px", width: "150px", backgroundColor: "var(--surface-light)" }}>
                 <div className="progress-bar bg-gradient-to-r from-primary to-accent" role="progressbar" style={{ width: `${progress}%`, background: 'var(--gradient-main)' }}></div>
               </div>
               <small className="text-muted">{Math.round(progress)}% Completed</small>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Topic Content */}
      <motion.div 
        className="card-premium mb-5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-3" style={{ borderColor: 'var(--glass-border)' }}>
          <h3 className="fw-bold mb-0 text-light">
             <span className="text-gradient">#{currentTopicIndex + 1}</span> {topics[currentTopicIndex]?.title}
          </h3>
        </div>
        
        <div
          className="px-2 text-muted fw-light fs-5 mb-5"
          style={{ lineHeight: '1.8' }}
          dangerouslySetInnerHTML={{ __html: topics[currentTopicIndex]?.content }}
        ></div>
        
        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between mt-auto pt-4 border-top border-secondary" style={{ borderColor: 'var(--glass-border)' }}>
          <button
            className="btn btn-outline-secondary rounded-pill px-4 fw-bold"
            onClick={handlePrevious}
            disabled={currentTopicIndex === 0}
            style={{ borderColor: 'var(--surface-light)', color: 'var(--text-muted)' }}
          >
            <FaArrowLeft className="me-2" /> Previous
          </button>
          
          <button
            className="btn btn-premium rounded-pill px-5"
            onClick={handleNext}
          >
            {currentTopicIndex === topics.length - 1 ? "Finish Course" : "Next Topic"}
            <FaArrowRight className="ms-2" />
          </button>
        </div>
      </motion.div>

      {/* Certificate Section */}
      {certificateGenerated && (
        <motion.div 
          className="text-center py-5 rounded-4 position-relative overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ background: 'linear-gradient(135deg, var(--surface), var(--background))', border: '1px solid var(--accent)' }}
        >
          <div className="position-relative z-1">
            <div className="mb-4">
               <FaCertificate className="text-warning display-1 drop-shadow-lg" />
            </div>
            <h2 className="display-6 fw-bold text-white mb-2">Congratulations!</h2>
            <p className="text-muted fs-5 mb-4">
              You've officially completed <span className="text-primary fw-bold">{course.title}</span>.
            </p>
            <button
              className="btn btn-premium btn-lg"
              onClick={handleDownloadCertificate}
            >
              Download Your Certificate
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SingleCourse;
