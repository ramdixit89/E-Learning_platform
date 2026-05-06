import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaMagic, FaSpinner } from "react-icons/fa";

const AddCourse = () => {
  const editor = useRef(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [topics, setTopics] = useState([
    { title: "", content: "", videoUrl: "", resources: [{ title: "", url: "" }] },
  ]);
  const [level, setLevel] = useState("beginner");
  const [tags, setTags] = useState("");
  const [duration, setDuration] = useState("");
  const [language, setLanguage] = useState("English");
  const [status, setStatus] = useState("draft");

  // Jodit Editor Configuration
const config = {
  uploader: { insertImageAsBase64URI: true },
  toolbarAdaptive: false,
  toolbarSticky: false,
  spellcheck: true,
  readonly: false,
  height: 300,
  buttons: [
    "source",
    "|",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "superscript",
    "subscript",
    "|",
    "ul",
    "ol",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "image",
    "file",
    "video",
    "table",
    "link",
    "|",
    "align",
    "undo",
    "redo",
    "cut",
    "copy",
    "paste",
    "|",
    "hr",
    "eraser",
    "symbol",
    "fullsize",
    "print",
    "about"
  ],
};


  // Handle Thumbnail Upload
  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  // Handle adding a new topic
  const addTopic = () => {
    setTopics([
      ...topics,
      { title: "", content: "", videoUrl: "", resources: [{ title: "", url: "" }] },
    ]);
  };

  // Handle topic changes
  const updateTopic = (index, key, value) => {
    const updatedTopics = topics.map((topic, i) =>
      i === index ? { ...topic, [key]: value } : topic
    );
    setTopics(updatedTopics);
  };
  
  const addResource = (topicIndex) => {
    setTopics((prev) =>
      prev.map((topic, i) =>
        i === topicIndex
          ? { ...topic, resources: [...(topic.resources || []), { title: "", url: "" }] }
          : topic
      )
    );
  };

  const updateResource = (topicIndex, resourceIndex, key, value) => {
    setTopics((prev) =>
      prev.map((topic, i) => {
        if (i !== topicIndex) return topic;
        const updatedResources = (topic.resources || []).map((res, rIdx) =>
          rIdx === resourceIndex ? { ...res, [key]: value } : res
        );
        return { ...topic, resources: updatedResources };
      })
    );
  };

  const removeResource = (topicIndex, resourceIndex) => {
    setTopics((prev) =>
      prev.map((topic, i) => {
        if (i !== topicIndex) return topic;
        const updatedResources = (topic.resources || []).filter((_, rIdx) => rIdx !== resourceIndex);
        return { ...topic, resources: updatedResources };
      })
    );
  };

  // Handle AI Auto-Generate
  const handleAiGenerate = async () => {
    if (!aiPrompt) return alert("Please enter a topic to generate!");
    setIsGenerating(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/course/generate-ai-skeleton", { prompt: aiPrompt });
      const aiCourse = data.course;
      if (aiCourse) {
        setTitle(aiCourse.title || "");
        setDescription(aiCourse.description || "");
        setLevel((aiCourse.level || "beginner").toLowerCase());
        setDuration(aiCourse.duration || "");
        setTags(aiCourse.tags || "");
        // Map topics to ensure they have the exact structure needed
        const newTopics = (aiCourse.topics || []).map(t => ({
          title: t.title || "",
          content: t.content || "",
          videoUrl: "",
          resources: [{ title: "", url: "" }]
        }));
        setTopics(newTopics.length > 0 ? newTopics : topics);
        alert("Course generated! Please review the content and add a thumbnail.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate course. Please ensure GROQ_API_KEY is configured.");
    }
    setIsGenerating(false);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("level", level);
    formData.append("duration", duration);
    formData.append("language", language);
    formData.append("status", status);
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    formData.append("tags", JSON.stringify(tagsArray));
    if (thumbnail) formData.append("thumbnail", thumbnail);
    formData.append("topics", JSON.stringify(topics)); // Convert topics to string

    try {
      const response = await axios.post(
        `http://localhost:5000/api/course/add-course`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with actual token
          },
        }
      );

      console.log("Response:", response.data);
      alert("Course Saved Successfully!");
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Failed to save course");
    }
  };

  return (
    <div className="container mt-4 pb-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="admin-header-title">Add New Course</h2>
      </div>

      {/* ✨ AI Generator Console */}
      <div className="card-glass mb-4 p-4" style={{ border: "1px solid rgba(99,102,241,0.3)", background: "var(--surface-2)" }}>
        <h5 style={{ color: "var(--primary)", fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <FaMagic /> AI Auto-Course Creator
        </h5>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Type a topic and let AI instantly generate the entire structured syllabus, titles, and rich-text descriptions.</p>
        <div className="d-flex gap-2">
          <input 
            type="text" 
            className="form-control" 
            placeholder="E.g., Complete Python Bootcamp 2024: Zero to Hero" 
            value={aiPrompt} 
            onChange={(e) => setAiPrompt(e.target.value)}
            disabled={isGenerating}
          />
          <button 
            type="button" 
            className="btn-primary-custom" 
            onClick={handleAiGenerate} 
            disabled={isGenerating}
            style={{ minWidth: "180px", justifyContent: "center" }}
          >
            {isGenerating ? <><FaSpinner className="fa-spin" /> Generating...</> : <><FaMagic /> Generate Magic</>}
          </button>
        </div>
      </div>
      
      <div className="admin-form-container">
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Course Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Author Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Course Thumbnail</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleThumbnailUpload}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Course Description</label>
          <JoditEditor
            ref={editor}
            value={description}
            config={config}
            onBlur={(newContent) => setDescription(newContent)}
          />
        </div>
        
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label fw-bold">Level</label>
            <select
              className="form-select"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label fw-bold">Duration</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. 4h 30m"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-bold">Language</label>
            <input
              type="text"
              className="form-control"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
          <div className="col-md-3">
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
        </div>

        <div className="mt-3">
          <label className="form-label fw-bold">Tags (comma separated)</label>
          <input
            type="text"
            className="form-control"
            placeholder="react, frontend, hooks"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <h4 className="mt-4">Course Topics</h4>
        {topics.map((topic, index) => (
          <div key={index} className="mb-3 p-3 border rounded">
            <label className="form-label fw-bold">Topic Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter topic title"
              value={topic.title}
              config={config}
              onChange={(e) => updateTopic(index, "title", e.target.value)}
              required
            />
            <label className="form-label fw-bold mt-2">Topic Content</label>
            <JoditEditor
              value={topic.content}
              config={config}
              onChange={(newContent) => updateTopic(index, "content", newContent)}
            />
            <label className="form-label fw-bold mt-3">Video URL</label>
            <input
              type="text"
              className="form-control"
              placeholder="https://..."
              value={topic.videoUrl || ""}
              onChange={(e) => updateTopic(index, "videoUrl", e.target.value)}
            />
            <div className="mt-3">
              <label className="form-label fw-bold">Resources</label>
              {(topic.resources || []).map((res, rIdx) => (
                <div key={`${index}-res-${rIdx}`} className="d-flex gap-2 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={res.title}
                    onChange={(e) => updateResource(index, rIdx, "title", e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="URL"
                    value={res.url}
                    onChange={(e) => updateResource(index, rIdx, "url", e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => removeResource(index, rIdx)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => addResource(index)}
              >
                Add Resource
              </button>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-3" onClick={addTopic}>
          ➕ Add Topic
        </button>

        <button type="submit" className="btn btn-primary">Save Course</button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
