import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AddCourse = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [topics, setTopics] = useState([{ title: "", content: "" }]);

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
    setTopics([...topics, { title: "", content: "" }]);
  };

  // Handle topic changes
  const updateTopic = (index, key, value) => {
    const updatedTopics = topics.map((topic, i) =>
      i === index ? { ...topic, [key]: value } : topic
    );
    setTopics(updatedTopics);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    if (thumbnail) formData.append("thumbnail", thumbnail);
    formData.append("topics", JSON.stringify(topics)); // Convert topics to string

    try {
      const response = await axios.post(
        `http://localhost:8000/api/course/add-course`,
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
    <div className="container mt-4">
      <h2 className="mb-3">Add Course</h2>
      
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
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-3" onClick={addTopic}>
          ➕ Add Topic
        </button>

        <button type="submit" className="btn btn-primary">Save Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
