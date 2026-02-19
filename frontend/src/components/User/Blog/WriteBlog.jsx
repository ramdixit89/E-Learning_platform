import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = import.meta.env.VITE_BASE_URL;

const WriteBlog = () => {
  const editor = useRef(null);
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Tech");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const config = {
    uploader: { insertImageAsBase64URI: true },
    toolbarAdaptive: false,
    toolbarSticky: false,
    spellcheck: true,
    readonly: false,
    height: 300,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please login to write a blog.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("status", status);
    formData.append("content", content);
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    formData.append("tags", JSON.stringify(tagsArray));
    if (coverImage) formData.append("coverImage", coverImage);

    try {
      await axios.post(`${API_URL}/api/blogs`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      alert("Blog saved successfully!");
      setTitle("");
      setCategory("Tech");
      setTags("");
      setStatus("draft");
      setContent("");
      setCoverImage(null);
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog");
    }
  };

  return (
    <div className="container page">
      <h2 className="mb-3 section-title">Write a Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label fw-bold">Category</label>
            <input
              type="text"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">Cover Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="form-label fw-bold">Tags (comma separated)</label>
          <input
            type="text"
            className="form-control"
            placeholder="react, backend, css"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="mt-3">
          <label className="form-label fw-bold">Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Save Blog
        </button>
      </form>
    </div>
  );
};

export default WriteBlog;
