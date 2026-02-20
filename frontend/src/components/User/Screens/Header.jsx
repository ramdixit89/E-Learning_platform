import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaUser, FaBook, FaSignOutAlt, FaBars, FaTimes,
  FaCode, FaGraduationCap
} from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
    setDropdownOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/blogs", label: "Blog" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <nav
        className={`navbar-custom ${scrolled ? "scrolled" : ""}`}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: scrolled ? "0.6rem 0" : "1rem 0", transition: "all 0.35s ease" }}
      >
        <div className="container d-flex align-items-center justify-content-between" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>

          {/* Logo */}
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none" style={{ gap: "0.6rem" }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "linear-gradient(135deg, #6366f1, #06b6d4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px rgba(99,102,241,0.4)",
            }}>
              <FaCode style={{ color: "white", fontSize: "16px" }} />
            </div>
            <span style={{
              fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem",
              background: "linear-gradient(90deg, #818cf8, #06b6d4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              RDCoders
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="d-none d-lg-flex align-items-center" style={{ gap: "0.25rem" }}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  padding: "0.45rem 1rem",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: isActive(link.to) ? "#f1f5f9" : "#94a3b8",
                  background: isActive(link.to) ? "rgba(99,102,241,0.12)" : "transparent",
                  border: isActive(link.to) ? "1px solid rgba(99,102,241,0.2)" : "1px solid transparent",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => { if (!isActive(link.to)) { e.target.style.color = "#f1f5f9"; e.target.style.background = "rgba(255,255,255,0.05)"; } }}
                onMouseLeave={(e) => { if (!isActive(link.to)) { e.target.style.color = "#94a3b8"; e.target.style.background = "transparent"; } }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="d-none d-lg-flex align-items-center" style={{ gap: "0.75rem" }}>
            {!token ? (
              <>
                <Link to="/login" className="btn-ghost" style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}>
                  Login
                </Link>
                <Link to="/register" className="btn-primary-custom" style={{ padding: "0.5rem 1.25rem", fontSize: "0.875rem" }}>
                  Get Started
                </Link>
              </>
            ) : (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
                    borderRadius: "9999px", padding: "0.35rem 0.75rem 0.35rem 0.35rem",
                    cursor: "pointer", color: "#f1f5f9", transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "#6366f1"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)"}
                >
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%",
                    background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px",
                  }}>
                    <FaUser style={{ color: "white" }} />
                  </div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Account</span>
                </button>

                {dropdownOpen && (
                  <div
                    style={{
                      position: "absolute", top: "calc(100% + 10px)", right: 0,
                      background: "#161c30", border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: "14px", minWidth: "200px", padding: "0.5rem",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.6)", zIndex: 1000,
                      animation: "fadeInUp 0.15s ease",
                    }}
                  >
                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.65rem 0.9rem", borderRadius: "8px", color: "#94a3b8", fontSize: "0.875rem", textDecoration: "none", transition: "all 0.2s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.1)"; e.currentTarget.style.color = "#f1f5f9"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; }}
                    >
                      <FaBook style={{ color: "#6366f1", fontSize: "13px" }} />
                      My Dashboard
                    </Link>
                    <hr style={{ margin: "0.5rem 0", borderColor: "rgba(255,255,255,0.07)" }} />
                    <button
                      onClick={logOut}
                      style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.65rem 0.9rem", borderRadius: "8px", color: "#f87171", fontSize: "0.875rem", background: "transparent", border: "none", cursor: "pointer", width: "100%", transition: "all 0.2s ease" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <FaSignOutAlt style={{ fontSize: "13px" }} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="d-lg-none btn-icon"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "#f1f5f9" }}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="d-lg-none"
            style={{
              background: "rgba(9,13,31,0.97)", backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255,255,255,0.07)", padding: "1rem 1.5rem 1.5rem",
              animation: "fadeInUp 0.2s ease",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", marginBottom: "1rem" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.to} to={link.to}
                  style={{
                    padding: "0.75rem 1rem", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 500,
                    color: isActive(link.to) ? "#818cf8" : "#94a3b8",
                    background: isActive(link.to) ? "rgba(99,102,241,0.1)" : "transparent",
                    textDecoration: "none", transition: "all 0.2s ease",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {!token ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <Link to="/login" className="btn-ghost" style={{ textAlign: "center" }}>Login</Link>
                <Link to="/register" className="btn-primary-custom" style={{ textAlign: "center", justifyContent: "center" }}>Get Started</Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <Link to="/dashboard" style={{ padding: "0.7rem 1rem", borderRadius: "10px", color: "#94a3b8", fontSize: "0.875rem", textDecoration: "none" }}>My Dashboard</Link>
                <button onClick={logOut} style={{ padding: "0.7rem 1rem", borderRadius: "10px", color: "#f87171", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", fontSize: "0.875rem" }}>Logout</button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Close dropdown on outside click */}
      {dropdownOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 999 }}
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
