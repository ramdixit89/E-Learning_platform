import React from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaUser, FaBook, FaInfoCircle, FaPhone, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.png'
const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const logOut = () =>{
    localStorage.removeItem('token');
    navigate('/');
  }

  // State to handle scroll effect
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar 
      variant="dark"
      expand="lg" 
      fixed="top"
      className={`py-3 transition-all duration-300 ${scrolled ? 'bg-glass shadow-lg' : 'bg-transparent'}`}
      style={{ transition: 'all 0.3s ease' }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
           {/* You can replace this with an img tag if you have a logo asset */}
           <div style={{
             width: '40px', 
             height: '40px', 
             background: 'var(--gradient-main)', 
             borderRadius: '8px',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             color: 'white',
             fontSize: '20px',
             fontWeight: 'bold'
           }}>
             R
           </div>
           <span className="fw-bold fs-4 text-white" style={{ fontFamily: 'var(--font-heading)' }}>
             RDCoders
           </span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-4">
            <Nav.Link as={Link} to="/" className="text-white fw-medium hover-accent">Home</Nav.Link>
            <Nav.Link as={Link} to="/courses" className="text-white fw-medium hover-accent">Courses</Nav.Link>
            <Nav.Link as={Link} to="/blogs" className="text-white fw-medium hover-accent">Blogs</Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-white fw-medium hover-accent">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="text-white fw-medium hover-accent">Contact</Nav.Link>
            
            {!token ? (
              <div className="d-flex gap-3 ms-lg-3">
                <Link to="/login" className="btn btn-outline-premium">
                  Login
                </Link>
                <Link to="/register" className="btn-premium">
                  Get Started
                </Link>
              </div>
            ) : (
              <Dropdown className="ms-lg-3">
                <Dropdown.Toggle 
                  id="dropdown-basic" 
                  className="border-0 d-flex align-items-center gap-2"
                  style={{ background: 'var(--surface-light)', color: 'white' }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--gradient-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px'
                  }}>
                    <FaUser />
                  </div> 
                  <span>Account</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow-lg border-0 mt-2" style={{ background: 'var(--surface)', minWidth: '200px' }}>
                  <Dropdown.Item as={Link} to="/dashboard" className="text-light hover-bg-light py-2">
                     <FaBook className="me-2 text-accent" /> Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/settings" className="text-light hover-bg-light py-2">
                     <FaUser className="me-2 text-accent" /> Profile
                  </Dropdown.Item>
                  <Dropdown.Divider style={{ borderColor: 'var(--glass-border)' }} />
                  <Dropdown.Item onClick={logOut} className="text-danger py-2">
                     <FaSignInAlt className="me-2" /> Logout
                  </Dropdown.Item>
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
