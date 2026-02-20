import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaBook, FaPenNib, FaUsers, FaChartLine,
  FaArrowUp, FaArrowDown, FaEye, FaCheckCircle,
  FaTimesCircle, FaPlus, FaEdit, FaTrash,
  FaGraduationCap, FaFire
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../User/Common/Toast";
import { StatCardSkeleton } from "../../User/Common/Skeleton";

const API_URL = import.meta.env.VITE_BASE_URL;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07 } }),
};

// Animated counter
const AnimatedNumber = ({ target = 0, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!target) return;
    let v = 0;
    const step = Math.max(1, Math.ceil(target / 45));
    const t = setInterval(() => {
      v = Math.min(v + step, target);
      setCount(v);
      if (v >= target) clearInterval(t);
    }, 25);
    return () => clearInterval(t);
  }, [target]);
  return <>{prefix}{count}{suffix}</>;
};

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const headers = { Authorization: token };

    Promise.all([
      axios.get(`${API_URL}/api/course/get-course`, { headers }).catch(() => ({ data: { courses: [] } })),
      axios.get(`${API_URL}/api/blogs`, { headers }).catch(() => ({ data: { blogs: [] } })),
      axios.get(`${API_URL}/auth/users`, { headers }).catch(() => ({ data: [] })),
    ]).then(([courseRes, blogRes, userRes]) => {
      setCourses(courseRes.data.courses || []);
      setBlogs(blogRes.data.blogs || []);
      setUsers(Array.isArray(userRes.data) ? userRes.data : []);
    }).finally(() => setLoading(false));
  }, [token]);

  const handleDeleteCourse = async (id) => {
    if (!confirm("Delete this course?")) return;
    try {
      await axios.delete(`${API_URL}/api/course/delete-course/${id}`, { headers: { Authorization: token } });
      setCourses((prev) => prev.filter((c) => c._id !== id));
      toast("Course deleted successfully", "success");
    } catch {
      toast("Failed to delete course", "error");
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm("Delete this blog?")) return;
    try {
      await axios.delete(`${API_URL}/api/blogs/${id}`, { headers: { Authorization: token } });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      toast("Blog deleted successfully", "success");
    } catch {
      toast("Failed to delete blog", "error");
    }
  };

  const toggleCourseStatus = async (course) => {
    const newStatus = course.status === "published" ? "draft" : "published";
    try {
      const fd = new FormData();
      fd.append("status", newStatus);
      await axios.put(`${API_URL}/api/course/update-course/${course._id}`, fd, {
        headers: { "Content-Type": "multipart/form-data", Authorization: token },
      });
      setCourses((prev) => prev.map((c) => c._id === course._id ? { ...c, status: newStatus } : c));
      toast(`Course ${newStatus === "published" ? "published" : "unpublished"}`, "success");
    } catch {
      toast("Failed to update status", "error");
    }
  };

  // Derived stats
  const publishedCourses = courses.filter((c) => c.status === "published").length;
  const publishedBlogs = blogs.filter((b) => b.status === "published").length;

  const stats = [
    {
      label: "Total Courses",
      value: courses.length,
      sub: `${publishedCourses} published`,
      icon: <FaBook />,
      color: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.2)", iconColor: "#818cf8",
      trend: "up", trendVal: "+2 this week",
      link: "/admin/all-course",
    },
    {
      label: "Blog Posts",
      value: blogs.length,
      sub: `${publishedBlogs} published`,
      icon: <FaPenNib />,
      color: "rgba(6,182,212,0.1)", border: "rgba(6,182,212,0.2)", iconColor: "#67e8f9",
      trend: "up", trendVal: "+3 this week",
      link: "/admin/all-blogs",
    },
    {
      label: "Total Users",
      value: users.length,
      sub: "Registered learners",
      icon: <FaUsers />,
      color: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.2)", iconColor: "#34d399",
      trend: "up", trendVal: "+12 this month",
      link: "/admin/users",
    },
    {
      label: "Completion Rate",
      value: 78,
      sub: "Based on enrollments",
      icon: <FaGraduationCap />,
      color: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)", iconColor: "#fbbf24",
      trend: "up", trendVal: "+5% vs last month",
      link: null,
      suffix: "%",
    },
  ];

  const recentActivity = [
    { icon: "📚", text: `${courses.length} total courses in the platform`, time: "Now", color: "#818cf8" },
    { icon: "📝", text: `${blogs.length} blog posts published`, time: "Today", color: "#67e8f9" },
    { icon: "👥", text: `${users.length} registered learners`, time: "All time", color: "#34d399" },
    { icon: "🏆", text: "Certificate system active", time: "Always", color: "#fbbf24" },
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: 1200, margin: "0 auto" }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div className="hero-badge" style={{ marginBottom: "0.5rem" }}>⚡ Admin Panel</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", marginBottom: 0 }}>
              Dashboard <span className="text-gradient">Overview</span>
            </h1>
            <p style={{ color: "var(--text-dim)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
              {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link to="/admin/add-course" className="btn-primary-custom" style={{ textDecoration: "none" }}>
              <FaPlus /> New Course
            </Link>
            <Link to="/admin/add-blog" className="btn-ghost" style={{ textDecoration: "none" }}>
              <FaPenNib /> New Blog
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ── Stat Cards ── */}
      <div className="row g-3 mb-4">
        {stats.map((s, i) => (
          <motion.div key={i} className="col-sm-6 col-xl-3" initial="hidden" animate="visible" variants={fadeUp} custom={i}>
            {loading ? <StatCardSkeleton /> : (
              <div
                className="admin-stat-card"
                onClick={() => s.link && navigate(s.link)}
                style={{ cursor: s.link ? "pointer" : "default" }}
              >
                <div className="admin-stat-icon" style={{ background: s.color, border: `1px solid ${s.border}`, color: s.iconColor }}>
                  {s.icon}
                </div>
                <div className="admin-stat-value">
                  <AnimatedNumber target={s.value} suffix={s.suffix || ""} />
                </div>
                <div className="admin-stat-label">{s.label}</div>
                <div className="admin-stat-trend up">
                  <FaArrowUp style={{ fontSize: "9px" }} /> {s.trendVal}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "0.3rem" }}>{s.sub}</div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* ── Main Grid: Courses + Activity ── */}
      <div className="row g-4 mb-4">

        {/* Recent Courses */}
        <div className="col-lg-8">
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h5 style={{ fontFamily: "var(--font-display)", fontWeight: 700, margin: 0 }}>
                📚 Recent Courses
              </h5>
              <Link to="/admin/all-course" style={{ fontSize: "0.8rem", color: "#818cf8", textDecoration: "none" }}>
                View all →
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} style={{ height: 58, background: "var(--surface-2)", borderRadius: "var(--radius-md)", animation: "skeleton-shimmer 1.6s infinite" }} />
                ))
              ) : courses.slice(0, 6).map((course, i) => (
                <motion.div
                  key={course._id}
                  initial="hidden" animate="visible" variants={fadeUp} custom={i}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    padding: "0.75rem 0.85rem", borderRadius: "var(--radius-md)",
                    background: "var(--surface-2)", border: "1px solid var(--border)",
                    transition: "var(--transition)",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                >
                  {course.thumbnail
                    ? <img src={course.thumbnail} alt="" style={{ width: 42, height: 42, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
                    : <div style={{ width: 42, height: 42, borderRadius: 8, background: "linear-gradient(135deg, #6366f1, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.1rem" }}>📚</div>
                  }
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: "0.875rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {course.title}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
                      {course.author || "RDCoders"} · {new Date(course.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <span style={{
                    padding: "0.2rem 0.65rem", borderRadius: "9999px", fontSize: "0.7rem", fontWeight: 600,
                    background: course.status === "published" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                    color: course.status === "published" ? "#34d399" : "#fbbf24",
                    border: `1px solid ${course.status === "published" ? "rgba(16,185,129,0.2)" : "rgba(245,158,11,0.2)"}`,
                    flexShrink: 0,
                  }}>
                    {course.status || "draft"}
                  </span>
                  <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                    <button
                      onClick={() => toggleCourseStatus(course)}
                      style={{
                        background: "none", border: "1px solid var(--border)", borderRadius: 6,
                        padding: "0.25rem 0.5rem", cursor: "pointer", fontSize: "11px",
                        color: "var(--text-dim)", transition: "all 0.2s",
                      }}
                      title={course.status === "published" ? "Unpublish" : "Publish"}
                    >
                      {course.status === "published" ? <FaTimesCircle /> : <FaCheckCircle style={{ color: "#34d399" }} />}
                    </button>
                    <button
                      onClick={() => navigate(`/admin/edit-course/${course._id}`)}
                      style={{ background: "none", border: "1px solid var(--border)", borderRadius: 6, padding: "0.25rem 0.5rem", cursor: "pointer", fontSize: "11px", color: "#818cf8", transition: "all 0.2s" }}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      style={{ background: "none", border: "1px solid var(--border)", borderRadius: 6, padding: "0.25rem 0.5rem", cursor: "pointer", fontSize: "11px", color: "#f87171", transition: "all 0.2s" }}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </motion.div>
              ))}
              {!loading && courses.length === 0 && (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-dim)" }}>
                  No courses yet.{" "}
                  <Link to="/admin/add-course" style={{ color: "#818cf8" }}>Add the first one →</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="col-lg-4">
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem", marginBottom: "1rem" }}>
            <h5 style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: "1.25rem" }}>
              <FaFire style={{ color: "#f97316", marginRight: "0.5rem" }} /> Activity
            </h5>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {recentActivity.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: `${a.color}15`, border: `1px solid ${a.color}33`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, fontSize: "0.9rem",
                  }}>{a.icon}</div>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{a.text}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "0.15rem" }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
            <h5 style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: "1rem" }}>⚡ Quick Actions</h5>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { label: "Add Course", icon: "📚", to: "/admin/add-course" },
                { label: "Add Blog", icon: "✍️", to: "/admin/add-blog" },
                { label: "All Courses", icon: "📋", to: "/admin/all-course" },
                { label: "All Blogs", icon: "📝", to: "/admin/all-blogs" },
                { label: "Manage Users", icon: "👥", to: "/admin/users" },
              ].map((item) => (
                <Link
                  key={item.to} to={item.to}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    padding: "0.65rem 0.85rem", borderRadius: "var(--radius-md)",
                    background: "var(--surface-2)", border: "1px solid var(--border)",
                    textDecoration: "none", color: "var(--text-muted)", fontSize: "0.875rem",
                    transition: "var(--transition)", fontWeight: 500,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"; e.currentTarget.style.color = "var(--text)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                >
                  <span>{item.icon}</span> {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent Blogs ── */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <h5 style={{ fontFamily: "var(--font-display)", fontWeight: 700, margin: 0 }}>✍️ Recent Blog Posts</h5>
          <Link to="/admin/all-blogs" style={{ fontSize: "0.8rem", color: "#818cf8", textDecoration: "none" }}>View all →</Link>
        </div>
        <div className="row g-3">
          {loading
            ? [...Array(3)].map((_, i) => (
              <div key={i} className="col-md-4">
                <div style={{ height: 80, background: "var(--surface-2)", borderRadius: "var(--radius-md)", animation: "skeleton-shimmer 1.6s infinite" }} />
              </div>
            ))
            : blogs.slice(0, 6).map((blog, i) => (
              <motion.div key={blog._id} className="col-md-4 col-lg-3" initial="hidden" animate="visible" variants={fadeUp} custom={i}>
                <div style={{
                  padding: "1rem", borderRadius: "var(--radius-md)",
                  background: "var(--surface-2)", border: "1px solid var(--border)",
                  display: "flex", flexDirection: "column", gap: "0.5rem",
                  height: "100%",
                }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, lineHeight: 1.4 }} className="truncate-2">
                    {blog.title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
                    {blog.authorName} · {new Date(blog.createdAt).toLocaleDateString()}
                  </div>
                  <div style={{ display: "flex", gap: "0.4rem", marginTop: "auto" }}>
                    <button
                      onClick={() => navigate(`/admin/edit-blog/${blog._id}`)}
                      style={{ flex: 1, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 6, padding: "0.3rem", cursor: "pointer", fontSize: "12px", color: "#818cf8" }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog._id)}
                      style={{ flex: 1, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 6, padding: "0.3rem", cursor: "pointer", fontSize: "12px", color: "#f87171" }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          }
          {!loading && blogs.length === 0 && (
            <div className="col-12" style={{ textAlign: "center", padding: "2rem", color: "var(--text-dim)" }}>
              No blogs yet. <Link to="/admin/add-blog" style={{ color: "#818cf8" }}>Write the first one →</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;