import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaArrowRight, FaCertificate } from "react-icons/fa";
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
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with actual token
          },
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
      <div className="text-center py-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading course details...
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
        const response = await axios.post(
          `${API_URL}/api/complete-course/complete`,
          {
            userId: localStorage.getItem("userId"),
            courseId: course._id,
            courseTitle: course.title,
          },
          {
            headers: { Authorization: localStorage.getItem("token")},
          }
        );
        console.log(response.data.message);
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
  return (
    <div className="container py-5 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <img
          src={course.thumbnail}
          alt={course.title}
          className="img-fluid rounded shadow-lg"
          style={{ maxWidth: "400px" }}
        />
        <h2 className="mt-3 text-primary fw-bold">{course.title} Content</h2>
        <p
          className="text-muted text-center"
          style={{ textAlign: "justify" }}
          dangerouslySetInnerHTML={{ __html: course.description }}
        ></p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-4 shadow-lg border-0 rounded"
        style={{
          background: "linear-gradient(to right, #f8f9fa, #eef1f6)",
          borderRadius: "15px",
        }}
      >
        <h4 className="mb-3 text-dark fw-semibold text-center">
          {topics[currentTopicIndex]?.title}
        </h4>
        <p
          className="text-muted text-justify"
          style={{ textAlign: "justify" }}
          dangerouslySetInnerHTML={{
            __html: topics[currentTopicIndex]?.content,
          }}
        ></p>

        {/* Progress Percentage */}
        <h5 className="text-success fw-bold mb-2">{progress.toFixed(2)}% Completed</h5>

        <div className="progress mb-3" style={{ height: "10px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(to right, #4caf50, #2e7d32)",
            }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        <div className="d-flex justify-content-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn btn-outline-secondary px-4 py-2 fw-bold shadow-sm d-flex align-items-center gap-2"
            onClick={handlePrevious}
            disabled={currentTopicIndex === 0}
          >
            <FaArrowLeft />
            {currentTopicIndex > 0
              ? topics[currentTopicIndex - 1].title
              : "Previous"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn btn-primary px-4 py-2 fw-bold shadow-sm d-flex align-items-center gap-2"
            onClick={handleNext}
          >
            {currentTopicIndex === topics.length - 1 ? "Finish 🎉" : `Next `}
            {topics[currentTopicIndex + 1]?.title} <FaArrowRight />
          </motion.button>
        </div>
      </motion.div>

      {certificateGenerated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 p-4 bg-light rounded shadow-sm"
        >
          <h3 className="text-success">Congratulations! 🎉</h3>
          <p className="text-muted text-justify" style={{ textAlign: "justify" }}>
            You have successfully completed the course.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="btn btn-success px-4 py-2 fw-bold shadow-sm d-flex align-items-center gap-2"
            onClick={() => alert("Certificate Generated!")}
          >
            <FaCertificate /> 🎓 Download Certificate
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default SingleCourse;