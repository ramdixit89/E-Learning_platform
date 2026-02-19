import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = import.meta.env.VITE_BASE_URL;

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="container page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 section-title">Tech Blogs</h2>
        {token && (
          <Link to="/blogs/write" className="btn btn-primary">
            Write Blog
          </Link>
        )}
      </div>

      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <div className="row">
          {blogs.map((blog) => (
            <div className="col-md-4 mb-4" key={blog._id}>
              <div className="card h-100 shadow-sm border-0">
                {blog.coverImage && (
                  <img src={blog.coverImage} className="card-img-top" alt={blog.title} />
                )}
                <div className="card-body">
                  <h5 className="card-title fw-bold">{blog.title}</h5>
                  <p className="text-muted mb-2">
                    <small>By {blog.authorName || "Instructor"}</small>
                  </p>
                  <p className="card-text">{blog.excerpt || "Read the full article..."}</p>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {(blog.tags || []).slice(0, 3).map((tag) => (
                      <span key={tag} className="badge text-bg-light">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link to={`/blogs/${blog._id}`} className="btn btn-outline-dark btn-sm">
                    Read More
                  </Link>
                </div>
                <div className="card-footer bg-white border-0 text-muted">
                  <small>{new Date(blog.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
            </div>
          ))}
          {blogs.length === 0 && <p>No blogs published yet.</p>}
        </div>
      )}
    </div>
  );
};

export default Blogs;
