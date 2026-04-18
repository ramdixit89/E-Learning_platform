import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaCertificate, FaBook, FaUser, FaSignOutAlt, FaGraduationCap,
  FaArrowRight, FaFire, FaChartBar, FaMedal, FaEnvelope,
  FaDownload, FaTrophy
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useToast } from "../Common/Toast";
import { DashboardCourseSkeleton, StatCardSkeleton } from "../Common/Skeleton";

const API_URL = import.meta.env.VITE_BASE_URL;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

// Animated counter
const AnimatedNumber = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!target) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}{suffix}</>;
};

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [inProgressCourses, setInProgressCourses] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [loadingCerts, setLoadingCerts] = useState(true);
  const { toast } = useToast();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId || !token) return;
    axios.get(`${API_URL}/auth/singleUser/${userId}`, { headers: { Authorization: token } })
      .then((res) => setUser(res.data))
      .catch(() => toast("Failed to load profile", "error"))
      .finally(() => setLoadingProfile(false));
  }, [userId, token]);

  useEffect(() => {
    if (!userId || !token) return;
    axios.get(`${API_URL}/api/complete-course/completed/${userId}`, { headers: { Authorization: token } })
      .then((res) => setCompletedCourses(res.data.courses || []))
      .catch(() => toast("Failed to load certificates", "error"))
      .finally(() => setLoadingCerts(false));
  }, [userId, token]);

  useEffect(() => {
    if (!token) return;
    axios.get(`${API_URL}/api/progress/my`, { headers: { Authorization: token } })
      .then((res) => setInProgressCourses(res.data.progress || []))
      .catch(() => toast("Failed to load progress", "error"))
      .finally(() => setLoadingProgress(false));
  }, [token]);

  const handleDownloadCertificate = async (courseId, courseTitle) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/complete-course/generate-certificate`,
        { userId, courseId },
        { headers: { Authorization: token }, responseType: "blob" }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${courseTitle}_certificate.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast(`Certificate for "${courseTitle}" downloaded!`, "success");
    } catch {
      toast("Failed to download certificate. Try again.", "error");
    }
  };

  const handleEmailCertificate = async (courseId, courseTitle) => {
    try {
      await axios.post(
        `${API_URL}/api/complete-course/email-certificate`,
        { userId, courseId },
        { headers: { Authorization: token } }
      );
      toast(`Certificate emailed to ${user?.email}!`, "success");
    } catch {
      toast("Failed to email certificate. Try again.", "error");
    }
  };

  // Stats
  const totalTopicsDone = inProgressCourses.reduce((sum, p) => sum + (p.completedTopics?.length || 0), 0);
  const totalQuizzesTaken = inProgressCourses.reduce((sum, p) => sum + (p.quizScores?.length || 0), 0);

  const stats = [
    { icon: "📚", label: "In Progress", value: inProgressCourses.length, color: "rgba(99,102,241,0.12)", iconColor: "#818cf8", border: "rgba(99,102,241,0.2)" },
    { icon: "🏆", label: "Certificates", value: completedCourses.length, color: "rgba(245,158,11,0.12)", iconColor: "#fbbf24", border: "rgba(245,158,11,0.2)" },
    { icon: "✅", label: "Topics Done", value: totalTopicsDone, color: "rgba(16,185,129,0.12)", iconColor: "#34d399", border: "rgba(16,185,129,0.2)" },
    { icon: "🎯", label: "Quizzes Completed", value: totalQuizzesTaken, color: "rgba(236,72,153,0.12)", iconColor: "#f472b6", border: "rgba(236,72,153,0.2)" },
  ];

  return (
    <div className="page">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* ── Profile Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(6,182,212,0.08))",
            border: "1px solid rgba(99,102,241,0.2)", borderRadius: "var(--radius-xl)",
            padding: "2.5rem", marginBottom: "2rem",
            display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap",
            position: "relative", overflow: "hidden",
          }}
        >
          {/* bg orb */}
          <div style={{
            position: "absolute", top: "-60px", right: "-60px", width: 250, height: 250,
            borderRadius: "50%", background: "rgba(99,102,241,0.08)", filter: "blur(60px)",
            pointerEvents: "none",
          }} />

          {/* Avatar */}
          <div style={{
            width: 100, height: 100, borderRadius: "50%", flexShrink: 0,
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "2.5rem", fontWeight: 800, color: "white",
            boxShadow: "0 0 30px rgba(99,102,241,0.4)",
          }}>
            {loadingProfile ? "?" : (user?.username?.[0] || "U").toUpperCase()}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="hero-badge" style={{ marginBottom: "0.5rem" }}>
              🎓 Learner Profile
            </div>
            {loadingProfile ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ height: 26, width: 180, background: "var(--surface-2)", borderRadius: 8, animation: "skeleton-shimmer 1.6s infinite" }} />
                <div style={{ height: 14, width: 220, background: "var(--surface-2)", borderRadius: 6, animation: "skeleton-shimmer 1.6s infinite" }} />
              </div>
            ) : (
              <>
                <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", marginBottom: "0.25rem" }}>
                  {user?.username}
                </h1>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.75rem" }}>
                  {user?.email}
                </p>
                <p style={{ color: "#34d399", fontSize: "0.875rem", margin: 0, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  🚀 Keep pushing — your journey continues!
                </p>
              </>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={() => { localStorage.clear(); window.location.href = "/login"; }}
            className="btn-ghost"
            style={{ alignSelf: "flex-start" }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </motion.div>

        {/* ── Stats Bar ── */}
        <div className="row g-3 mb-4">
          {stats.map((s, i) => (
            <motion.div key={i} className="col-6 col-md-3" initial="hidden" animate="visible" variants={fadeUp} custom={i}>
              {(loadingProgress || loadingCerts) ? <StatCardSkeleton /> : (
                <div className="admin-stat-card">
                  <div className="admin-stat-icon" style={{ background: s.color, border: `1px solid ${s.border}`, color: s.iconColor }}>
                    <span style={{ fontSize: "1.2rem" }}>{s.icon}</span>
                  </div>
                  <div className="admin-stat-value">
                    <AnimatedNumber target={s.value} />
                  </div>
                  <div className="admin-stat-label">{s.label}</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* ── In Progress Courses ── */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.35rem", margin: 0 }}>
              Continue <span className="text-gradient">Learning</span>
            </h2>
            <Link to="/courses" style={{ fontSize: "0.85rem", color: "#818cf8", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              Browse all <FaArrowRight style={{ fontSize: "11px" }} />
            </Link>
          </div>

          <div className="row g-3">
            {loadingProgress
              ? [...Array(3)].map((_, i) => <div key={i} className="col-md-6 col-lg-4"><DashboardCourseSkeleton /></div>)
              : inProgressCourses.length > 0
                ? inProgressCourses.map((item, i) => {
                    const pct = item.courseId?.topics?.length
                      ? Math.round((item.completedTopics.length / item.courseId.topics.length) * 100)
                      : 0;
                    return (
                      <motion.div key={item._id} className="col-md-6 col-lg-4" initial="hidden" animate="visible" variants={fadeUp} custom={i}>
                        <div style={{
                          background: "var(--surface)", border: "1px solid var(--border)",
                          borderRadius: "var(--radius-lg)", padding: "1.25rem",
                          display: "flex", flexDirection: "column", gap: "0.75rem", height: "100%",
                          transition: "var(--transition)",
                        }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                        >
                          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                            {item.courseId?.thumbnail
                              ? <img src={item.courseId.thumbnail} alt="" style={{ width: 52, height: 52, borderRadius: 10, objectFit: "cover" }} />
                              : <div style={{ width: 52, height: 52, borderRadius: 10, background: "linear-gradient(135deg, #6366f1, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem" }}>📚</div>
                            }
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 700, fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {item.courseId?.title || "Course"}
                              </div>
                              <div style={{ color: "var(--text-dim)", fontSize: "0.75rem", textTransform: "capitalize" }}>
                                {item.courseId?.level || "beginner"}
                              </div>
                            </div>
                            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", color: pct === 100 ? "#34d399" : "#818cf8" }}>
                              {pct}%
                            </div>
                          </div>
                          <div style={{ position: "relative" }}>
                            <div style={{ height: 6, background: "var(--surface-2)", borderRadius: 9999, overflow: "hidden" }}>
                              <div style={{
                                height: "100%", borderRadius: 9999,
                                background: pct === 100 ? "#34d399" : "linear-gradient(90deg, #6366f1, #06b6d4)",
                                width: `${pct}%`, transition: "width 0.8s ease",
                              }} />
                            </div>
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
                            {item.completedTopics?.length || 0} / {item.courseId?.topics?.length || "?"} topics done
                          </div>
                          <Link
                            to={`/courses/${item.courseId?._id}`}
                            className="btn-primary-custom"
                            style={{ justifyContent: "center", textDecoration: "none", fontSize: "0.85rem", padding: "0.6rem" }}
                          >
                            {pct === 100 ? "Review Course" : "Resume"} <FaArrowRight style={{ fontSize: "11px" }} />
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })
                : (
                  <div className="col-12">
                    <div style={{
                      textAlign: "center", padding: "3rem", border: "2px dashed var(--border)",
                      borderRadius: "var(--radius-lg)", color: "var(--text-dim)",
                    }}>
                      <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📖</div>
                      <p style={{ marginBottom: "1rem" }}>No courses in progress yet.</p>
                      <Link to="/courses" className="btn-primary-custom" style={{ textDecoration: "none", display: "inline-flex" }}>
                        Browse Courses <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                )
            }
          </div>
        </div>

        {/* ── Certificates ── */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.35rem", margin: 0 }}>
              Your <span className="text-gradient">Certificates</span>
            </h2>
            <span style={{ fontSize: "0.85rem", color: "var(--text-dim)" }}>
              <FaTrophy style={{ color: "#fbbf24", marginRight: "0.4rem" }} />
              {completedCourses.length} earned
            </span>
          </div>

          <div className="row g-3">
            {loadingCerts
              ? [...Array(3)].map((_, i) => <div key={i} className="col-md-6 col-lg-4"><DashboardCourseSkeleton /></div>)
              : completedCourses.length > 0
                ? completedCourses.map((course, i) => (
                  <motion.div key={i} className="col-md-6 col-lg-4" initial="hidden" animate="visible" variants={fadeUp} custom={i}>
                    <div style={{
                      background: "linear-gradient(135deg, rgba(245,158,11,0.08), rgba(251,191,36,0.04))",
                      border: "1px solid rgba(245,158,11,0.2)", borderRadius: "var(--radius-lg)",
                      padding: "1.5rem", textAlign: "center", height: "100%",
                      display: "flex", flexDirection: "column", alignItems: "center",
                    }}>
                      <div style={{
                        width: 60, height: 60, borderRadius: "50%",
                        background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.5rem", marginBottom: "1rem",
                      }}>
                        🏅
                      </div>
                      <h5 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", marginBottom: "0.4rem" }}>
                        {course.courseTitle}
                      </h5>
                      <p style={{ color: "var(--text-dim)", fontSize: "0.78rem", marginBottom: "1.25rem" }}>
                        Issued {new Date(course.completionDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                      <div style={{ display: "flex", gap: "0.6rem", width: "100%", marginTop: "auto" }}>
                        <button
                          onClick={() => handleDownloadCertificate(course.courseId, course.courseTitle)}
                          className="btn-primary-custom"
                          style={{ flex: 1, justifyContent: "center", fontSize: "0.8rem", padding: "0.55rem" }}
                        >
                          <FaDownload style={{ fontSize: "11px" }} /> PDF
                        </button>
                        <button
                          onClick={() => handleEmailCertificate(course.courseId, course.courseTitle)}
                          className="btn-ghost"
                          style={{ flex: 1, justifyContent: "center", fontSize: "0.8rem", padding: "0.55rem" }}
                        >
                          <FaEnvelope style={{ fontSize: "11px" }} /> Email
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
                : (
                  <div className="col-12">
                    <div style={{
                      textAlign: "center", padding: "3rem", border: "2px dashed var(--border)",
                      borderRadius: "var(--radius-lg)", color: "var(--text-dim)",
                    }}>
                      <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🎓</div>
                      <p>Complete a course to earn your first certificate!</p>
                    </div>
                  </div>
                )
            }
          </div>
        </div>

        {/* ── AI Quizzes Completed ── */}
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", marginTop: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.35rem", margin: 0 }}>
              Recent <span className="text-gradient">AI Quizzes</span>
            </h2>
          </div>
          
          <div className="d-flex flex-column gap-3">
             {loadingProgress ? (
                <div style={{ height: "80px", background: "var(--surface-2)", borderRadius: "var(--radius-lg)", animation: "skeleton-shimmer 1.6s infinite" }}></div>
             ) : inProgressCourses.filter(p => p.quizScores && p.quizScores.length > 0).length > 0 ? (
                inProgressCourses.filter(p => p.quizScores && p.quizScores.length > 0).map((prog, i) => {
                   const bestQuiz = prog.quizScores.reduce((prev, current) => (prev.score > current.score) ? prev : current);
                   return (
                      <motion.div key={`quiz-${i}`} initial="hidden" animate="visible" variants={fadeUp} custom={i} style={{
                         background: "var(--surface)", border: "1px solid var(--glass-border)", borderRadius: "10px", padding: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", borderColor: 'var(--border)'
                      }}
                         onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary-color)"; }}
                         onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                      >
                         <div className="d-flex align-items-center gap-3">
                            <div style={{ width: 45, height: 45, borderRadius: 10, background: "rgba(236, 72, 153, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>
                               🎯
                            </div>
                            <div>
                               <h6 style={{ margin: 0, fontWeight: 700, color: "var(--text-main)" }}>{prog.courseId?.title}</h6>
                               <small style={{ color: "var(--text-dim)" }}>Score recorded on {new Date(bestQuiz.date).toLocaleDateString()}</small>
                            </div>
                         </div>
                         <div className="d-flex align-items-center gap-4">
                            <div className="text-center">
                               <div style={{ fontSize: "1.1rem", fontWeight: 800, color: bestQuiz.score >= (bestQuiz.total / 2) ? "#34d399" : "#f87171" }}>
                                  {bestQuiz.score} / {bestQuiz.total}
                               </div>
                               <small style={{ color: "var(--text-dim)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1px" }}>Best Score</small>
                            </div>
                            <Link to={`/courses/${prog.courseId?._id}`} className="btn-primary-custom" style={{ textDecoration: "none", padding: "0.5rem 1rem", fontSize: "0.85rem", display: 'flex', alignItems: 'center' }}>
                               Retake Quiz <FaArrowRight className="ms-2" style={{ fontSize: "10px" }} />
                            </Link>
                         </div>
                      </motion.div>
                   )
                })
             ) : (
                <div style={{ textAlign: "center", padding: "2.5rem", border: "1px dashed var(--glass-border)", borderRadius: "var(--radius-lg)" }}>
                   <p className="text-muted mb-0">You haven't taken any AI Quizzes yet. Generate one inside a course to test your knowledge!</p>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
