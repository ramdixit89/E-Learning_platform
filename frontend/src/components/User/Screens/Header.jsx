import React from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaUser, FaBook, FaInfoCircle, FaPhone, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const logOut = () =>{
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm py-3 px-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-danger fs-4">
          RDCoders
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3">
            <Nav.Link as={Link} to="/courses" className="fw-bold">
              <FaBook className="me-1" /> Courses
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="fw-bold">
              <FaInfoCircle className="me-1" /> About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="fw-bold">
              <FaPhone className="me-1" /> Contact
            </Nav.Link>
            {!token ? (
              <>
                <Nav.Link as={Link} to="/login" className="fw-bold text-primary">
                  <FaSignInAlt className="me-1" /> Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="fw-bold text-success">
                  <FaUserPlus className="me-1" /> Register
                </Nav.Link>
              </>
            ) : (
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" className="fw-bold">
                  <FaUser /> Profile
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow-sm">
                  <Dropdown.Item as={Link} to="/dashboard">Dashboard</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                  <Dropdown.Item as={Link} onClick={logOut} to="/" className="text-danger">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
