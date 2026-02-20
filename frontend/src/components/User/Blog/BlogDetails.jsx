import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaClock, FaTag, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion";
import RichContent from "../Common/RichContent";

const API_URL = import.meta.env.VITE_BASE_URL;

// Reading time estimate
const readingTime = (html = "") => {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollPct, setScrollPct] = useState(0);
  const [showTop, setShowTop] = useState(false);

  // Reading progress + back-to-top
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setScrollPct(total > 0 ? Math.round((scrolled / total) * 100) : 0);
      setShowTop(scrolled > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/blogs/${id}`);
        setBlog(response.data.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem", animation: "spin-slow 2s linear infinite", display: "inline-block" }}>⚙️</div>
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="page" style={{ textAlign: "center", color: "var(--text-muted)" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>😕</div>
        <h3>Blog post not found.</h3>
        <Link to="/blogs" className="btn-ghost" style={{ display: "inline-flex", marginTop: "1rem" }}>
          <FaArrowLeft /> Back to Blog
        </Link>
      </div>
    );
  }

  const tagColors = ["badge-primary", "badge-cyan", "badge-green", "badge-amber"];

  return (
    <div className="page">
      {/* Reading progress bar */}
      <div className="reading-progress" style={{ width: `${scrollPct}%` }} />

      {/* Back-to-top */}
      {showTop && (
        <button className="back-to-top" onClick={scrollToTop} title="Back to top">
          <FaChevronUp style={{ fontSize: "14px" }} />
        </button>
      )}

      <div className="container" style={{ maxWidth: "820px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Back link */}
        <Link
          to="/blogs"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            color: "var(--text-muted)", fontSize: "0.875rem", textDecoration: "none",
            marginBottom: "2rem", transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#818cf8"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
        >
          <FaArrowLeft style={{ fontSize: "12px" }} /> Back to Blog
        </Link>

        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
              {blog.tags.map((tag, i) => (
                <span key={tag} className={`badge-primary ${tagColors[i % tagColors.length]}`} style={{ fontSize: "0.72rem" }}>
                  <FaTag style={{ marginRight: "3px", fontSize: "9px" }} />{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)", lineHeight: 1.2,
            marginBottom: "1.25rem", color: "var(--text)",
          }}>
            {blog.title}
          </h1>

          {/* Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "14px", fontWeight: 700, color: "white",
              }}>
                {(blog.authorName || "R")[0].toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.875rem" }}>{blog.authorName || "Instructor"}</div>
                <div style={{ color: "var(--text-dim)", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <FaClock style={{ fontSize: "10px" }} />
                  {new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </div>
              </div>
            </div>
            {/* Reading time */}
            <div style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              padding: "0.3rem 0.75rem", borderRadius: "9999px",
              background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)",
              fontSize: "0.75rem", color: "#818cf8", fontWeight: 600,
            }}>
              📖 {readingTime(blog.content)} min read
            </div>
          </div>

          {/* Cover image */}
          {blog.coverImage && (
            <div style={{ marginBottom: "2.5rem", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border)" }}>
              <img
                src={blog.coverImage}
                alt={blog.title}
                style={{ width: "100%", display: "block", maxHeight: "460px", objectFit: "cover" }}
              />
            </div>
          )}

          {/* Divider */}
          <div className="divider" />

          {/* RICH CONTENT — renders code blocks beautifully */}
          <RichContent html={blog.content} />

          {/* Footer divider */}
          <div className="divider" style={{ marginTop: "3rem" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <Link to="/blogs" className="btn-ghost">
              <FaArrowLeft /> All Posts
            </Link>
            <div style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>
              Published {new Date(blog.createdAt).toLocaleDateString()}
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogDetails;
