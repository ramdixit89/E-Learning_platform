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
      <div className="text-center py-5">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
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
    <div className="container-fluid py-5">
      {/* Course Header */}
      <div className="row align-items-center mb-5">
        <div className="col-md-5 text-center">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="img-fluid rounded-4 shadow-sm"
            style={{ maxHeight: "280px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-7">
          <h2 className="text-primary fw-bold">{course.title}</h2>
          <p className="text-muted mt-3" style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: course.description }}></p>
          <span className="badge bg-success fs-6 mt-2">{topics.length} Topics Included</span>
          <div className="mt-3">
            <h5 className="text-info">"Knowledge is the key to unlock your future!"</h5>
            <p className="fst-italic text-secondary">Join us and let your learning adventure begin...</p>
          </div>
        </div>
      </div>

      {/* Topic Content */}
      <div className="card p-4 shadow-lg border-0 rounded-4 mb-4 bg-white">
        <h4 className="text-center text-dark fw-semibold mb-3">
          {topics[currentTopicIndex]?.title}
        </h4>
        <div
          className="px-2 text-muted"
          style={{  textAlign: "justify" }}
          dangerouslySetInnerHTML={{ __html: topics[currentTopicIndex]?.content }}
        ></div>
        {/* Progress Bar */}
        <div className="mt-4">
          <h6 className="text-success fw-bold mb-1">Progress: {progress.toFixed(2)}%</h6>
          <div className="progress" style={{ height: "10px" }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-outline-secondary fw-semibold px-4 py-2"
            onClick={handlePrevious}
            disabled={currentTopicIndex === 0}
          >
            <FaArrowLeft className="me-2" />
            {currentTopicIndex > 0 ? topics[currentTopicIndex - 1].title : "Previous"}
          </button>
          <button
            className="btn btn-primary fw-semibold px-4 py-2"
            onClick={handleNext}
          >
            {currentTopicIndex === topics.length - 1 ? "Finish 🎉" : `Next: ${topics[currentTopicIndex + 1]?.title || ""}`}
            <FaArrowRight className="ms-2" />
          </button>
        </div>
      </div>

      {/* Certificate Section */}
      {certificateGenerated && (
        <div className="card bg-light p-4 rounded-4 border-0 shadow-sm">
          <h3 className="text-success fw-bold mb-2 text-center">🎉 Congratulations!</h3>
          <p className="text-muted text-center mb-4">
            You have successfully completed the course. Your journey to success has just begun!
          </p>
          <div className="text-center">
            <button
              className="btn btn-success btn-lg fw-bold d-inline-flex align-items-center"
              onClick={handleDownloadCertificate}
            >
              <FaCertificate className="me-2" />
              Download Certificate
            </button>
          </div>
          <div className="mt-3">
            <p className="fs-6 fst-italic text-info">
              "Keep learning, keep growing! Your achievements are our motivation."
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleCourse;
