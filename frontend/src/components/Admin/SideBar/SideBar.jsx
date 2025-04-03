import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { FaBars, FaTimes, FaHome, FaBook, FaUser, FaCog } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const SideBar = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button (Mobile) */}
      <Button
        variant="dark"
        className="position-fixed d-lg-none top-0 start-0 m-3"
        onClick={() => setShow(true)}
      >
        <FaBars />
      </Button>

      {/* Sidebar Modal for Small Screens */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Body className="p-4" style={{ backgroundColor: "#1E293B", color: "white" }}>
          <Button
            variant="outline-light"
            className="border-0 float-end"
            onClick={() => setShow(false)}
          >
            <FaTimes />
          </Button>
          <SideBarContent closeSidebar={() => setShow(false)} />
        </Modal.Body>
      </Modal>

      {/* Sidebar (Desktop View) */}
      <div
        className="d-none d-lg-flex flex-column vh-100 p-4"
        style={{ backgroundColor: "#1E293B", color: "white", width: "250px" }}
      >
        <SideBarContent />
      </div>
    </>
  );
};

// Sidebar Content Component
const SideBarContent = ({ closeSidebar }) => (
  <div>
    <h3 className="text-center mb-4" style={{ color: "#FACC15" }}>RDCoders Admin</h3>
    <ul className="list-unstyled">
      <li className="mb-3">
        <Link
          to="/admin/add-course"
          className="text-white text-decoration-none d-flex align-items-center p-2 rounded"
          style={{ backgroundColor: "#334155" }}
          onClick={closeSidebar}
        >
          <FaHome className="me-2 text-warning" /> Add Course
        </Link>
      </li>
      <li className="mb-3">
        <Link
          to="/admin/all-course"
          className="text-white text-decoration-none d-flex align-items-center p-2 rounded"
          style={{ backgroundColor: "#334155" }}
          onClick={closeSidebar}
        >
          <FaBook className="me-2 text-warning" /> All courses
        </Link>
      </li>
      <li className="mb-3">
        <Link
          to="/admin/users"
          className="text-white text-decoration-none d-flex align-items-center p-2 rounded"
          style={{ backgroundColor: "#334155" }}
          onClick={closeSidebar}
        >
          <FaUser className="me-2 text-warning" /> Users
        </Link>
      </li>
      <li>
        <Link
          to="/admin/settings"
          className="text-white text-decoration-none d-flex align-items-center p-2 rounded"
          style={{ backgroundColor: "#334155" }}
          onClick={closeSidebar}
        >
          <FaCog className="me-2 text-warning" /> 
        </Link>
      </li>
    </ul>
  </div>
);

export default SideBar;
