import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/manage/list`, {
          headers: {
            Authorization: token,
          },
        });
        setBlogs(response.data.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
      alert("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/edit-blog/${id}`);
  };

  const toggleStatus = async (blog) => {
    try {
      const formData = new FormData();
      formData.append("status", blog.status === "published" ? "draft" : "published");
      await axios.put(`http://localhost:5000/api/blogs/${blog._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: token },
      });
      setBlogs((prev) =>
        prev.map((item) =>
          item._id === blog._id
            ? { ...item, status: blog.status === "published" ? "draft" : "published" }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">All Blogs</h2>
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-4 mb-4" key={blog._id}>
            <div className="card shadow-sm border-0 h-100">
              {blog.coverImage && (
                <img className="img-fluid rounded" src={blog.coverImage} alt={blog.title} />
              )}
              <div className="card-body">
                <h5 className="card-title fw-bold">{blog.title}</h5>
                <p className="card-text">
                  <strong>Author:</strong> {blog.authorName || "Instructor"}
                </p>
                <p className="card-text">
                  <strong>Status:</strong>{" "}
                  <span className={blog.status === "published" ? "text-success" : "text-warning"}>
                    {blog.status || "draft"}
                  </span>
                </p>
                <p className="text-muted">
                  <small>Uploaded At: {new Date(blog.createdAt).toLocaleDateString()}</small>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary btn-sm" onClick={() => handleUpdate(blog._id)}>
                    Update
                  </button>
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => toggleStatus(blog)}>
                    {blog.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(blog._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {blogs.length === 0 && <p>No blogs available.</p>}
      </div>
    </div>
  );
};

export default AllBlogs;
