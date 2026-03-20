import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCertificate,
  FaPlayCircle,
  FaStar,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import RichContent from "../Common/RichContent";

const API_URL = import.meta.env.VITE_BASE_URL;

const SingleCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const [completedTopics, setCompletedTopics] = useState([]);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [ratingSummary, setRatingSummary] = useState({ averageRating: 0, reviewsCount: 0 });
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/course/get-single-course/${id}`,
        {
          headers: { Authorization: token },
        }
      );
      setCourse(response.data.course);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const fetchProgress = async () => {
    if (!token || !userId) return;
    try {
      const response = await axios.get(`${API_URL}/api/progress/${id}`, {
        headers: { Authorization: token },
      });
      const progress = response.data.progress;
      setCurrentTopicIndex(progress.currentTopicIndex || 0);
      setCompletedTopics(progress.completedTopics || []);
      setCertificateGenerated(!!progress.isCompleted);
      setProgressLoaded(true);
    } catch (error) {
      if (error?.response?.status === 404) {
        try {
          await axios.post(
            `${API_URL}/api/progress/enroll`,
            { courseId: id },
            { headers: { Authorization: token } }
          );
          setProgressLoaded(true);
        } catch (enrollError) {
          console.error("Error enrolling course:", enrollError);
        }
      } else {
        console.error("Error fetching progress:", error);
      }
    }
  };

  const fetchReviews = async () => {
    try {
      const [reviewsRes, summaryRes] = await Promise.all([
        axios.get(`${API_URL}/api/reviews/${id}`),
        axios.get(`${API_URL}/api/reviews/${id}/summary`),
      ]);
      setReviews(reviewsRes.data.reviews || []);
      setRatingSummary(summaryRes.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchCourse();
    fetchProgress();
    fetchReviews();
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
  const progress =
    topics.length > 0 ? (completedTopics.length / topics.length) * 100 : 0;

  const handleNext = async () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // <-- Add smooth scroll to top
    if (currentTopicIndex < topics.length - 1) {
      const nextIndex = currentTopicIndex + 1;
      const updatedCompleted = completedTopics.includes(currentTopicIndex)
        ? completedTopics
        : [...completedTopics, currentTopicIndex];
      setCompletedTopics(updatedCompleted);
      setCurrentTopicIndex(nextIndex);
      if (progressLoaded) {
        try {
          await axios.patch(
            `${API_URL}/api/progress/${course._id}`,
            {
              completedTopicIndex: currentTopicIndex,
              currentTopicIndex: nextIndex,
            },
            { headers: { Authorization: token } }
          );
        } catch (error) {
          console.error("Error updating progress:", error);
        }
      }
    } else {
      setCertificateGenerated(true);
      if (!completedTopics.includes(currentTopicIndex)) {
        setCompletedTopics([...completedTopics, currentTopicIndex]);
      }
      if (progressLoaded) {
        try {
          await axios.patch(
            `${API_URL}/api/progress/${course._id}`,
            {
              completedTopicIndex: currentTopicIndex,
              currentTopicIndex: currentTopicIndex,
              isCompleted: true,
            },
            { headers: { Authorization: token } }
          );
        } catch (error) {
          console.error("Error completing progress:", error);
        }
      }
      try {
        await axios.post(
          `${API_URL}/api/complete-course/complete`,
          {
            userId,
            courseId: course._id,
            courseTitle: course.title,
          },
          { headers: { Authorization: token } }
        );
        console.log("Course marked as completed.");
      } catch (error) {
        console.error("Error marking course as completed:", error.response?.data);
      }
    }
  };

  const handlePrevious = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // <-- Add smooth scroll to top
    if (currentTopicIndex > 0) {
      const prevIndex = currentTopicIndex - 1;
      setCurrentTopicIndex(prevIndex);
      if (progressLoaded) {
        axios
          .patch(
            `${API_URL}/api/progress/${course._id}`,
            { currentTopicIndex: prevIndex },
            { headers: { Authorization: token } }
          )
          .catch((error) => console.error("Error updating progress:", error));
      }
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
          headers: { Authorization: token },
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

  const handleEmailCertificate = async () => {
    try {
      await axios.post(
        `${API_URL}/api/complete-course/email-certificate`,
        {
          userId,
          courseId: course._id,
        },
        { headers: { Authorization: token } }
      );
      alert("Certificate emailed successfully.");
    } catch (error) {
      console.error("Error emailing certificate:", error.response?.data || error);
      alert("Failed to email certificate. Please try again later.");
    }
  };

  return (
    <div className="container page">
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
           <RichContent html={course.description} className="text-muted mb-4" />
          
          <div className="d-flex align-items-center gap-4 flex-wrap">
            <span className="badge bg-success rounded-pill px-4 py-2 fs-6">
               {topics.length} Topics
            </span>
            <div className="d-flex align-items-center gap-2">
               <div className="progress w-100" style={{ height: "8px", width: "150px", backgroundColor: "var(--surface-light)" }}>
                 <div className="progress-bar bg-gradient-to-r from-primary to-accent" role="progressbar" style={{ width: `${progress}%`, background: 'var(--gradient-main)' }}></div>
               </div>
               <small className="text-muted">{Math.round(progress)}% Completed</small>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FaStar className="text-warning" />
              <span className="text-light fw-bold">
                {ratingSummary.averageRating || 0}
              </span>
              <small className="text-muted">
                ({ratingSummary.reviewsCount || 0} reviews)
              </small>
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
        
        <RichContent html={topics[currentTopicIndex]?.content || ""} />

        {topics[currentTopicIndex]?.videoUrl && (
          <div className="mb-4">
            <video
              src={topics[currentTopicIndex].videoUrl}
              controls
              className="w-100 rounded-4 border border-secondary"
            />
          </div>
        )}

        {topics[currentTopicIndex]?.resources?.length > 0 && (
          <div className="mb-4">
            <h6 className="text-light mb-2">Resources</h6>
            <div className="d-flex flex-column gap-2">
              {topics[currentTopicIndex].resources.map((resItem, idx) => (
                <a
                  key={`${resItem.url}-${idx}`}
                  href={resItem.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none text-primary"
                >
                  {resItem.title || resItem.url}
                </a>
              ))}
            </div>
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between mt-auto pt-4 border-top border-secondary" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="d-flex flex-column align-items-start">
            <button
              className="btn btn-outline-secondary rounded-pill px-4 fw-bold"
              onClick={handlePrevious}
              disabled={currentTopicIndex === 0}
              style={{ borderColor: 'var(--surface-light)', color: 'var(--text-muted)' }}
            >
              <FaArrowLeft className="me-2" /> Previous
            </button>
          </div>
          
          <div className="d-flex flex-column align-items-end">
            <button
              className="btn btn-outline-secondary rounded-pill px-5 mb-2"
              onClick={handleNext}
            >
              {currentTopicIndex === topics.length - 1 ? "Finish Course" : "Next Topic"}
              <FaArrowRight className="ms-2" />
            </button>
            {/* Next topic name */}
            {currentTopicIndex < topics.length - 1 && (
              <small className="text-muted fst-italic">Up next: {topics[currentTopicIndex + 1]?.title}</small>
            )}
          </div>
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
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <button
                className="btn btn-primary btn-lg"
                onClick={handleDownloadCertificate}
              >
                Download Your Certificate
              </button>
              <button
                className="btn btn-outline-light btn-lg"
                onClick={handleEmailCertificate}
              >
                Email Me the Certificate
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Reviews Section */}
      <motion.div
        className="card-premium mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3 className="fw-bold mb-0 text-light">Learner Reviews</h3>
          <div className="d-flex align-items-center gap-2">
            <FaStar className="text-warning" />
            <span className="text-light fw-bold">
              {ratingSummary.averageRating || 0}
            </span>
            <small className="text-muted">
              ({ratingSummary.reviewsCount || 0})
            </small>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label text-light">Your Rating</label>
          <div className="d-flex align-items-center gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="btn btn-sm btn-outline-secondary"
                onClick={() =>
                  setReviewForm((prev) => ({ ...prev, rating: star }))
                }
              >
                <FaStar className={star <= reviewForm.rating ? "text-warning" : "text-muted"} />
              </button>
            ))}
          </div>
          <textarea
            className="form-control mb-3"
            rows="3"
            placeholder="Share what you liked or what could improve..."
            value={reviewForm.comment}
            onChange={(e) =>
              setReviewForm((prev) => ({ ...prev, comment: e.target.value }))
            }
          />
          <button
            className="btn btn-warning"
            disabled={reviewSubmitting}
            onClick={async () => {
              if (!token) return;
              setReviewSubmitting(true);
              try {
                await axios.post(
                  `${API_URL}/api/reviews/${course._id}`,
                  reviewForm,
                  { headers: { Authorization: token } }
                );
                setReviewForm({ rating: reviewForm.rating, comment: "" });
                await fetchReviews();
              } catch (error) {
                console.error("Error submitting review:", error);
              } finally {
                setReviewSubmitting(false);
              }
            }}
          >
            {reviewSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>

        <div className="d-flex flex-column gap-3">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="p-3 rounded-3 border border-secondary"
                style={{ borderColor: "var(--glass-border)" }}
              >
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="text-light fw-bold">
                    {review.userId?.username || "Learner"}
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={`${review._id}-${star}`}
                        className={star <= review.rating ? "text-warning" : "text-muted"}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-muted">{review.comment || "No comment"}</div>
              </div>
            ))
          ) : (
            <div className="text-muted">No reviews yet. Be the first to share.</div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SingleCourse;
