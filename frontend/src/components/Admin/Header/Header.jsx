import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const handleLogout = () => {
    console.log("Logging out...");
    // Add logout logic here (clear tokens, redirect, etc.)
  };

  return (
    <header
      className="d-flex justify-content-between align-items-center p-3 shadow-sm"
      style={{
        background: "linear-gradient(to right, #1E3A5F, #23395B)",
        color: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
      }}
    >
      <h2 className="m-0 fw-bold text-white"></h2>

      <div className="d-flex align-items-center gap-3">
        <div className="d-flex align-items-center">
          <FaUserCircle size={30} className="me-2 text-light" />
          <span className="fw-bold text-light">Admin</span>
        </div>
        <button className="btn btn-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
