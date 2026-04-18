import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaPen, FaClock, FaArrowRight, FaTag } from "react-icons/fa";
import { motion } from "framer-motion";
import { BlogCardSkeleton } from "../Common/Skeleton";

const API_URL = import.meta.env.VITE_BASE_URL;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/blogs`);
        setBlogs(response.data.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filtered = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    (b.tags || []).some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const tagColors = ["badge-primary", "badge-cyan", "badge-green", "badge-amber"];

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ marginBottom: "3rem" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2rem" }}>
            <div>
              <div className="hero-badge" style={{ marginBottom: "0.75rem" }}>📝 Developer Blog</div>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "0.5rem" }}>
                Tech <span className="text-gradient">Insights</span>
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "1rem", margin: 0 }}>
                Deep dives, tutorials and guides by developers, for developers.
              </p>
            </div>
            {/* {token && (
              <Link to="/blogs/write" className="btn-primary-custom" style={{ alignSelf: "flex-start" }}>
                <FaPen /> Write a Post
              </Link>
            )} */}
          </div>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: "500px" }}>
            <FaSearch style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)", fontSize: "13px" }} />
            <input
              type="text" placeholder="Search posts or tags..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="input-field" style={{ paddingLeft: "2.75rem" }}
            />
          </div>
        </motion.div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="row g-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="col-md-4"><BlogCardSkeleton /></div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 0", color: "var(--text-dim)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "0.5rem" }}>No posts found</h3>
            <p>Try a different search term or check back later.</p>
          </div>
        ) : (
          <div className="row g-4">
            {filtered.map((blog, i) => (
              <motion.div
                key={blog._id} className="col-md-6 col-lg-4"
                initial="hidden" animate="visible" variants={fadeUp} custom={i}
              >
                <div className="blog-card">
                  <div className="blog-card-img">
                    {blog.coverImage ? (
                      <img src={blog.coverImage} alt={blog.title} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", background: "linear-gradient(135deg, var(--surface-2), var(--surface-3))" }}>
                        📝
                      </div>
                    )}
                  </div>

                  <div className="blog-card-body">
                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem" }}>
                      {(blog.tags || []).slice(0, 3).map((tag, j) => (
                        <span key={tag} className={`badge-primary ${tagColors[j % tagColors.length]}`} style={{ fontSize: "0.7rem", padding: "0.2rem 0.65rem" }}>
                          <FaTag style={{ marginRight: "3px", fontSize: "9px" }} />{tag}
                        </span>
                      ))}
                    </div>

                    <h5 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", lineHeight: 1.4, marginBottom: "0.6rem" }} className="truncate-2">
                      {blog.title}
                    </h5>

                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1rem", flex: 1 }} className="truncate-3">
                      {blog.excerpt || "Read the full article to learn more about this topic..."}
                    </p>

                    <div className="divider" style={{ margin: "0.75rem 0" }} />

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div className="avatar" style={{ width: 28, height: 28, fontSize: "11px" }}>
                          {(blog.authorName || "R")[0].toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontSize: "0.78rem", fontWeight: 600 }}>{blog.authorName || "Instructor"}</div>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <FaClock style={{ fontSize: "10px" }} />
                            {new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/blogs/${blog._id}`}
                        style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", fontWeight: 600, color: "#818cf8", textDecoration: "none", transition: "gap 0.2s ease" }}
                        onMouseEnter={(e) => e.currentTarget.style.gap = "0.7rem"}
                        onMouseLeave={(e) => e.currentTarget.style.gap = "0.4rem"}
                      >
                        Read <FaArrowRight style={{ fontSize: "11px" }} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
