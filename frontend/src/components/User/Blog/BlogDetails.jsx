import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = import.meta.env.VITE_BASE_URL;

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="container mt-5">Loading blog...</p>;
  if (!blog) return <p className="container mt-5">Blog not found.</p>;

  return (
    <div className="container page">
      <h1 className="fw-bold mb-2 section-title">{blog.title}</h1>
      <p className="text-muted mb-3">
        By {blog.authorName || "Instructor"} • {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      {blog.coverImage && (
        <img src={blog.coverImage} className="img-fluid rounded mb-4" alt={blog.title} />
      )}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default BlogDetails;
