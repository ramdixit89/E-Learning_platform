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

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/course/get-single-course/${id}`);
        const { title, author, description, topics } = response.data.course;
        setTitle(title);
        setAuthor(author);
        setDescription(description);
        setTopics(topics || []);
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
    if (thumbnail) formData.append("thumbnail", thumbnail);
    formData.append("topics", JSON.stringify(topics));

    try {
      await axios.put(`http://localhost:8000/api/course/update-course/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Course Updated Successfully!");
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course. Please try again.");
    }
  };

  const addTopic = () => {
    setTopics([...topics, { title: "", content: "" }]);
  };

  const updateTopic = (index, key, value) => {
    setTopics((prevTopics) => {
      const updatedTopics = [...prevTopics];
      updatedTopics[index] = { ...updatedTopics[index], [key]: value };
      return updatedTopics;
    });
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
        <h4 className="mt-4">Course Topics</h4>
        {topics.map((topic, index) => (
          <div key={index} className="mb-3 p-3 border rounded">
            <input type="text" className="form-control mb-2" placeholder="Topic Title" value={topic.title} onChange={(e) => updateTopic(index, "title", e.target.value)} required />
            <JoditEditor value={topic.content} onBlur={(newContent) => updateTopic(index, "content", newContent)} />
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
