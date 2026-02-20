import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaSearch, FaFilter, FaBook, FaStar,
  FaCertificate, FaArrowRight, FaFire, FaBell, FaLaptopCode
} from "react-icons/fa";
import { CourseCardSkeleton } from "../Common/Skeleton";

const API_URL = import.meta.env.VITE_BASE_URL;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07 } }),
};

const levelColors = {
  beginner: "badge-green",
  intermediate: "badge-amber",
  advanced: "badge-primary",
};

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const notifications = [
    { emoji: "🎉", text: "New JavaScript course launched!" },
    { emoji: "⚛️", text: "React Advanced now live." },
    { emoji: "🏆", text: "Certificate layout updated." },
    { emoji: "🔥", text: "Weekend Bootcamp starts soon!" },
    { emoji: "💼", text: "Internship opportunities available." },
  ];

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search) params.search = search;
        if (level) params.level = level;
        if (tag) params.tag = tag;
        const response = await axios.get(`${API_URL}/api/course/get-course`, {
          params: { ...params, public: true },
          headers: { Authorization: localStorage.getItem("token") },
        });
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    const debounce = setTimeout(fetchCourses, 350);
    return () => clearTimeout(debounce);
  }, [search, level, tag]);

  return (
    <div className="page">
      <div style={{ display: "flex", maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem", gap: "2rem" }}>

        {/* ── MAIN CONTENT ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "2rem" }}>
            <div className="hero-badge" style={{ marginBottom: "0.75rem" }}>
              <FaFire /> Our Courses
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.4rem)", marginBottom: "0.5rem" }}>
              Learn & Grow with <span className="text-gradient">RDCoders</span>
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", margin: 0 }}>
              Expert-led courses with free certificates. Start learning today.
            </p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{
              background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)",
              padding: "1.25rem", marginBottom: "2rem",
            }}
          >
            <div className="row g-3 align-items-center">
              <div className="col-md-6">
                <div style={{ position: "relative" }}>
                  <FaSearch style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)", fontSize: "13px", zIndex: 1 }} />
                  <input
                    className="form-control" placeholder="Search courses, topics..."
                    value={search} onChange={(e) => setSearch(e.target.value)}
                    style={{ paddingLeft: "2.75rem" }}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select className="form-select" value={level} onChange={(e) => setLevel(e.target.value)}>
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="col-md-3">
                <div style={{ position: "relative" }}>
                  <FaFilter style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)", fontSize: "12px" }} />
                  <input
                    className="form-control" placeholder="Filter by tag"
                    value={tag} onChange={(e) => setTag(e.target.value)}
                    style={{ paddingLeft: "2.75rem" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results count */}
          {!loading && (
            <div style={{ marginBottom: "1.25rem", color: "var(--text-muted)", fontSize: "0.875rem" }}>
              {courses.length > 0 ? (
                <span>Showing <strong style={{ color: "var(--text)" }}>{courses.length}</strong> {courses.length === 1 ? "course" : "courses"}</span>
              ) : (
                <span>No courses found</span>
              )}
            </div>
          )}

          {/* Course Grid */}
          {loading ? (
            <div className="row g-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="col-md-6 col-lg-4"><CourseCardSkeleton /></div>
              ))}
            </div>
          ) : courses.length > 0 ? (
            <div className="row g-4">
              {courses.map((course, i) => (
                <motion.div
                  key={course._id} className="col-md-6 col-lg-4"
                  initial="hidden" animate="visible" variants={fadeUp} custom={i}
                >
                  <div className="course-card">
                    <div className="course-card-thumb">
                      {course.thumbnail ? (
                        <img src={course.thumbnail} alt={course.title} />
                      ) : (
                        <div className="course-card-thumb-placeholder"><FaLaptopCode /></div>
                      )}
                      {course.level && (
                        <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem" }}>
                          <span className={`badge-primary ${levelColors[course.level] || "badge-primary"}`} style={{ fontSize: "0.7rem", textTransform: "capitalize" }}>
                            {course.level}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="course-card-body">
                      <span className="course-tag">🎓 Free Certificate</span>
                      <h5 className="course-title">{course.title}</h5>

                      <div
                        className="truncate-2"
                        style={{ color: "var(--text-muted)", fontSize: "0.825rem", lineHeight: 1.6, marginBottom: "0.75rem" }}
                        dangerouslySetInnerHTML={{ __html: course.description }}
                      />

                      {/* Tags */}
                      {course.tags?.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem" }}>
                          {course.tags.slice(0, 3).map((t) => (
                            <span key={t} style={{
                              padding: "0.15rem 0.6rem", borderRadius: "9999px", fontSize: "0.7rem",
                              background: "var(--surface-3)", color: "var(--text-dim)", border: "1px solid var(--border)"
                            }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="course-meta" style={{ marginBottom: "1rem" }}>
                        <span><FaBook /> {course.topics?.length || 0} topics</span>
                        <span><FaStar style={{ color: "#fbbf24" }} /> 4.9</span>
                        {course.duration && <span>⏱ {course.duration}</span>}
                      </div>

                      <Link
                        to={`/courses/${course._id}`}
                        className="btn-primary-custom"
                        style={{ width: "100%", justifyContent: "center", textDecoration: "none", marginTop: "auto" }}
                      >
                        Start Learning <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "5rem 2rem", color: "var(--text-dim)" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
              <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "0.5rem", color: "var(--text-muted)" }}>No courses found</h3>
              <p style={{ fontSize: "0.9rem" }}>Try adjusting your search or filters.</p>
            </div>
          )}
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div className="d-none d-xl-block" style={{ width: "280px", flexShrink: 0 }}>
          <div className="topic-sidebar">

            {/* Notifications */}
            <div style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)", padding: "1.25rem", marginBottom: "1.25rem",
            }}>
              <h6 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.875rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FaBell style={{ color: "#fbbf24" }} /> Live Updates
              </h6>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {notifications.map((n, i) => (
                  <div key={i} className="notification-item">
                    <span style={{ marginRight: "0.5rem" }}>{n.emoji}</span>
                    {n.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade CTA */}
            <div style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.15))",
              border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: "var(--radius-lg)", padding: "1.5rem", textAlign: "center",
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>⚡</div>
              <h6 style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: "0.5rem" }}>
                Go Pro
              </h6>
              <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: "1rem", lineHeight: 1.6 }}>
                Unlock all premium courses and get priority support.
              </p>
              <button className="btn-primary-custom" style={{ width: "100%", justifyContent: "center", fontSize: "0.85rem" }}>
                Upgrade Now
              </button>
            </div>

            {/* Achievement */}
            <div style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)", padding: "1.25rem", marginTop: "1.25rem",
            }}>
              <h6 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.875rem", marginBottom: "1rem" }}>
                🏆 Your Progress
              </h6>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <FaCertificate style={{ color: "#fbbf24", fontSize: "1.5rem" }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.875rem" }}>Certificates Earned</div>
                  <div style={{ color: "#fbbf24", fontWeight: 800, fontSize: "1.25rem" }}>0</div>
                </div>
              </div>
              <div className="progress-bar-custom">
                <div className="progress-bar-custom-fill" style={{ width: "10%" }} />
              </div>
              <p style={{ color: "var(--text-dim)", fontSize: "0.75rem", marginTop: "0.5rem" }}>
                Complete your first course to earn a certificate!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
