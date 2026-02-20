import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight, FaBook, FaCertificate, FaUsers, FaRocket,
  FaPlayCircle, FaStar, FaCode, FaCheckCircle, FaBolt
} from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <FaBook />, color: "indigo", title: "Structured Curriculum", desc: "Expert-designed learning paths from fundamentals to advanced topics." },
    { icon: <FaCertificate />, color: "cyan", title: "Free Certificates", desc: "Industry-recognized certificates on course completion — at no cost." },
    { icon: <FaUsers />, color: "green", title: "Community Learning", desc: "Learn alongside thousands of developers. Ask, teach, grow together." },
    { icon: <FaRocket />, color: "amber", title: "Career Focused", desc: "Portfolio projects, interview prep and job-ready skills." },
  ];

  const stats = [
    { value: "12K+", label: "Students Enrolled" },
    { value: "80+", label: "Expert Courses" },
    { value: "4.9★", label: "Average Rating" },
    { value: "95%", label: "Completion Rate" },
  ];

  const popularCourses = [
    { title: "Full Stack JavaScript", tag: "Most Popular", topics: 24, emoji: "⚡" },
    { title: "React.js Mastery", tag: "Trending", topics: 18, emoji: "⚛️" },
    { title: "Node.js & MongoDB", tag: "Best Seller", topics: 20, emoji: "🔗" },
  ];

  const reviews = [
    { name: "Priya S.", role: "Frontend Dev", text: "Best platform I've used. The course structure and content quality is incredible.", rating: 5 },
    { name: "Arjun M.", role: "Student", text: "Got my first job after completing the Full Stack course here. Highly recommended!", rating: 5 },
    { name: "Sneha K.", role: "Software Engineer", text: "The certificates are genuinely helpful in interviews. Great content!", rating: 5 },
  ];

  return (
    <div style={{ minHeight: "100vh", paddingTop: "80px", overflow: "hidden" }}>

      {/* ── HERO ── */}
      <section style={{ padding: "5rem 0 4rem", position: "relative" }}>
        {/* Background orbs */}
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "rgba(99,102,241,0.12)", filter: "blur(120px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "rgba(6,182,212,0.1)", filter: "blur(100px)", pointerEvents: "none" }} />

        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
          <div className="row align-items-center g-5">

            {/* Left */}
            <motion.div className="col-lg-6" initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <div className="hero-badge">
                <span className="dot" />
                🎓 #1 Developer Learning Platform
              </div>

              <h1 className="hero-title">
                Build Real Skills.<br />
                <span className="text-gradient">Land Your Dream Job.</span>
              </h1>

              <p className="hero-sub">
                Master modern web development with hands-on projects, expert mentorship, and free certificates — all in one place.
              </p>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
                <button onClick={() => navigate("/courses")} className="btn-primary-custom" style={{ padding: "0.8rem 2rem", fontSize: "0.95rem" }}>
                  Explore Courses <FaArrowRight />
                </button>
                <button className="btn-ghost" style={{ padding: "0.8rem 2rem", fontSize: "0.95rem" }}>
                  <FaPlayCircle style={{ color: "#6366f1" }} /> Watch Demo
                </button>
              </div>

              {/* Social proof */}
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <div style={{ display: "flex" }}>
                  {["#6366f1","#06b6d4","#10b981","#f59e0b","#ec4899"].map((bg, i) => (
                    <div key={i} style={{
                      width: 36, height: 36, borderRadius: "50%", background: bg,
                      border: "2px solid var(--bg)", marginLeft: i > 0 ? -10 : 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "12px", fontWeight: 700, color: "white",
                    }}>
                      {i === 4 ? "+8K" : ""}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>8,000+ active learners</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#fbbf24", fontSize: "0.8rem" }}>
                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                    <span style={{ color: "var(--text-muted)", marginLeft: "0.25rem" }}>4.9/5</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — visual */}
            <motion.div
              className="col-lg-6 d-none d-lg-block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div style={{ position: "relative", paddingTop: "2rem" }}>
                {/* Card visual */}
                <div className="animate-float" style={{
                  background: "linear-gradient(135deg, #0f1423, #161c30)",
                  border: "1px solid rgba(99,102,241,0.2)", borderRadius: 24,
                  padding: "2rem", boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(99,102,241,0.15)",
                }}>
                  {/* Code window header */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                    {["#ef4444","#f59e0b","#10b981"].map((c) => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
                    <div style={{ flex: 1, background: "var(--surface-3)", borderRadius: 6, padding: "0.25rem 0.75rem", fontSize: "0.75rem", color: "var(--text-dim)", marginLeft: "0.5rem" }}>
                      🔒 rdcoders.dev/courses
                    </div>
                  </div>

                  {/* Course progress mockup */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.875rem", fontWeight: 700 }}>React.js Mastery</span>
                      <span style={{ fontSize: "0.75rem", color: "#6ee7b7" }}>72% done</span>
                    </div>
                    <div className="progress-bar-custom">
                      <div className="progress-bar-custom-fill" style={{ width: "72%" }} />
                    </div>
                  </div>

                  {/* Topics */}
                  {[
                    { label: "Introduction to React", done: true },
                    { label: "useState & useEffect", done: true },
                    { label: "React Router v6", done: true },
                    { label: "Redux Toolkit", done: false, active: true },
                    { label: "Custom Hooks", done: false },
                  ].map((t, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: "0.75rem",
                      padding: "0.6rem 0.75rem", borderRadius: 10, marginBottom: "0.35rem",
                      background: t.active ? "rgba(99,102,241,0.1)" : "transparent",
                      border: t.active ? "1px solid rgba(99,102,241,0.2)" : "1px solid transparent",
                    }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                        background: t.done ? "rgba(16,185,129,0.2)" : t.active ? "rgba(99,102,241,0.2)" : "var(--surface-3)",
                        border: `1px solid ${t.done ? "#10b981" : t.active ? "#6366f1" : "var(--border)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px",
                        color: t.done ? "#10b981" : t.active ? "#818cf8" : "var(--text-dim)",
                      }}>
                        {t.done ? <FaCheckCircle /> : i + 1}
                      </div>
                      <span style={{ fontSize: "0.8rem", color: t.done ? "var(--text-dim)" : t.active ? "#f1f5f9" : "var(--text-dim)" }}>
                        {t.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  style={{ position: "absolute", top: "0%", right: "-5%", background: "var(--surface-2)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 14, padding: "0.75rem 1rem", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", animation: "blink 2s infinite" }} />
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#6ee7b7" }}>Course Completed!</span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "0.25rem 0 0" }}>JavaScript Zero to Hero</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  style={{ position: "absolute", bottom: "5%", left: "-8%", background: "var(--surface-2)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 14, padding: "0.75rem 1rem", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1.25rem" }}>🏆</span>
                    <div>
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fcd34d" }}>Certificate Earned</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>Full Stack Developer</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "3rem 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="row g-4 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={i} className="col-6 col-md-3"
                initial="hidden" whileInView="visible" variants={fadeUp} custom={i}
                viewport={{ once: true }}
              >
                <div className="stat-number">{s.value}</div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.25rem" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "6rem 0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <motion.div className="section-header" initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
            <div className="hero-badge" style={{ margin: "0 auto 1rem" }}>
              <FaBolt /> Why RDCoders
            </div>
            <h2>Everything You Need to <span className="text-gradient">Succeed</span></h2>
            <p>We've built the platform that developers wish existed when they were learning.</p>
          </motion.div>

          <div className="row g-4">
            {features.map((f, i) => (
              <motion.div key={i} className="col-md-6 col-lg-3" initial="hidden" whileInView="visible" variants={fadeUp} custom={i * 0.1} viewport={{ once: true }}>
                <div className="card-glow" style={{ padding: "1.75rem", height: "100%" }}>
                  <div className={`feature-icon ${f.color}`}>{f.icon}</div>
                  <h5 style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: "0.6rem" }}>{f.title}</h5>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR COURSES ── */}
      <section style={{ padding: "5rem 0", background: "var(--surface)" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div className="hero-badge" style={{ marginBottom: "0.75rem" }}>📚 Courses</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, margin: 0 }}>Most Popular <span className="text-gradient">Courses</span></h2>
            </div>
            <button onClick={() => navigate("/courses")} className="btn-ghost">
              View All <FaArrowRight />
            </button>
          </div>

          <div className="row g-4">
            {popularCourses.map((c, i) => (
              <motion.div key={i} className="col-md-4" initial="hidden" whileInView="visible" variants={fadeUp} custom={i * 0.15} viewport={{ once: true }}>
                <div className="course-card">
                  <div className="course-card-thumb">
                    <div className="course-card-thumb-placeholder">{c.emoji}</div>
                    <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}>
                      <span className="badge-amber" style={{ fontSize: "0.7rem", padding: "0.25rem 0.75rem", borderRadius: "9999px" }}>{c.tag}</span>
                    </div>
                  </div>
                  <div className="course-card-body">
                    <span className="course-tag">Free Certificate</span>
                    <h5 className="course-title">{c.title}</h5>
                    <div className="course-meta">
                      <span><FaBook style={{ marginRight: 4 }} />{c.topics} topics</span>
                      <span><FaUsers style={{ marginRight: 4 }} />1.5k students</span>
                      <span style={{ color: "#fbbf24" }}><FaStar style={{ marginRight: 2 }} />4.9</span>
                    </div>
                    <button onClick={() => navigate("/courses")} className="btn-primary-custom" style={{ width: "100%", justifyContent: "center", marginTop: "auto" }}>
                      Start Learning <FaArrowRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "6rem 0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <motion.div className="section-header" initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
            <div className="hero-badge" style={{ margin: "0 auto 1rem" }}>💬 Testimonials</div>
            <h2>Loved by <span className="text-gradient">Developers</span></h2>
            <p>Don't just take our word for it — here's what our learners say.</p>
          </motion.div>

          <div className="row g-4">
            {reviews.map((r, i) => (
              <motion.div key={i} className="col-md-4" initial="hidden" whileInView="visible" variants={fadeUp} custom={i * 0.1} viewport={{ once: true }}>
                <div className="card-glass" style={{ padding: "1.5rem", height: "100%" }}>
                  <div style={{ display: "flex", color: "#fbbf24", marginBottom: "1rem", fontSize: "0.875rem" }}>
                    {[...Array(r.rating)].map((_, j) => <FaStar key={j} />)}
                  </div>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>"{r.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div className="avatar">{r.name[0]}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.875rem" }}>{r.name}</div>
                      <div style={{ color: "var(--text-dim)", fontSize: "0.78rem" }}>{r.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "4rem 0 6rem" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <motion.div className="cta-section" initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
            <div className="hero-badge" style={{ margin: "0 auto 1.25rem" }}>
              <FaRocket /> Start Today
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, marginBottom: "1rem" }}>
              Ready to Launch Your <span className="text-gradient">Dev Career?</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", maxWidth: 500, margin: "0 auto 2.5rem" }}>
              Join 12,000+ learners who have already upgraded their skills. Free to start, certificates included.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => navigate("/register")} className="btn-primary-custom" style={{ padding: "0.9rem 2.5rem", fontSize: "1rem" }}>
                Get Started Free <FaArrowRight />
              </button>
              <button onClick={() => navigate("/courses")} className="btn-ghost" style={{ padding: "0.9rem 2.5rem", fontSize: "1rem" }}>
                Browse Courses
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
