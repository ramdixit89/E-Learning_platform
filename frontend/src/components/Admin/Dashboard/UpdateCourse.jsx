import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateCourse = () => {
  const { id } = useParams();
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [topics, setTopics] = useState([]);
  const [level, setLevel] = useState("beginner");
  const [tags, setTags] = useState("");
  const [duration, setDuration] = useState("");
  const [language, setLanguage] = useState("English");
  const [status, setStatus] = useState("draft");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/course/get-single-course/${id}`);
        const {
          title,
          author,
          description,
          topics,
          level,
          tags,
          duration,
          language,
          status,
        } = response.data.course;
        setTitle(title);
        setAuthor(author);
        setDescription(description);
        setTopics(
          (topics || []).map((topic) => ({
            ...topic,
            videoUrl: topic.videoUrl || "",
            resources: topic.resources || [],
          }))
        );
        setLevel(level || "beginner");
        setTags((tags || []).join(", "));
        setDuration(duration || "");
        setLanguage(language || "English");
        setStatus(status || "draft");
      } catch (error) {
        console.error("Error fetching course details:", error);
        alert("Failed to fetch course details. Please try again.");
      }
    };
    fetchCourse();
  }, [id]);

  const handleThumbnailUpload = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (topics.length === 0) {
      alert("Please add at least one topic before updating the course.");
      return;
    }

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
    formData.append("topics", JSON.stringify(topics));

    try {
      await axios.put(`http://localhost:5000/api/course/update-course/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Course Updated Successfully!");
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course. Please try again.");
    }
  };

  const addTopic = () => {
    setTopics([
      ...topics,
      { title: "", content: "", videoUrl: "", resources: [{ title: "", url: "" }] },
    ]);
  };

  const updateTopic = (index, key, value) => {
    setTopics((prevTopics) => {
      const updatedTopics = [...prevTopics];
      updatedTopics[index] = { ...updatedTopics[index], [key]: value };
      return updatedTopics;
    });
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

  const deleteTopic = (index) => {
    setTopics((prevTopics) => prevTopics.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Update Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Course Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Author Name</label>
          <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Course Thumbnail</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleThumbnailUpload} />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Course Description</label>
          <JoditEditor ref={editor} value={description} onBlur={(newContent) => setDescription(newContent)} />
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
            <input type="text" className="form-control mb-2" placeholder="Topic Title" value={topic.title} onChange={(e) => updateTopic(index, "title", e.target.value)} required />
            <JoditEditor value={topic.content} onBlur={(newContent) => updateTopic(index, "content", newContent)} />
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
            <button type="button" className="btn btn-danger btn-sm mt-2" onClick={() => deleteTopic(index)}>Delete</button>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-3" onClick={addTopic}>Add Topic</button>
        <button type="submit" className="btn btn-primary">Update Course</button>
      </form>
    </div>
  );
};

export default UpdateCourse;
