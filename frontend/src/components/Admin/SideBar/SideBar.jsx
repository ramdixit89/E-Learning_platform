import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars, FaTimes, FaHome, FaBook, FaUsers,
  FaPenNib, FaCode, FaChevronRight, FaSignOutAlt,
  FaPlus, FaList
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: <FaHome />,
    to: "/admin/dashboard",
    exact: true,
  },
  {
    label: "Courses",
    icon: <FaBook />,
    children: [
      { label: "Add Course", icon: <FaPlus />, to: "/admin/add-course" },
      { label: "All Courses", icon: <FaList />, to: "/admin/all-course" },
    ],
  },
  {
    label: "Blogs",
    icon: <FaPenNib />,
    children: [
      { label: "Write Blog", icon: <FaPlus />, to: "/admin/add-blog" },
      { label: "All Blogs", icon: <FaList />, to: "/admin/all-blogs" },
    ],
  },
  { label: "Users", icon: <FaUsers />, to: "/admin/users" },
];

const SidebarContent = ({ closeSidebar }) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState({ Courses: true, Blogs: true });

  const isActive = (to, exact = false) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  const toggleSection = (label) =>
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "1.5rem 1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "2rem", paddingBottom: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{
          width: 36, height: 36, borderRadius: 9,
          background: "linear-gradient(135deg, #6366f1, #06b6d4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 16px rgba(99,102,241,0.4)",
        }}>
          <FaCode style={{ color: "white", fontSize: "14px" }} />
        </div>
        <div>
          <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "0.95rem", background: "linear-gradient(90deg, #818cf8, #67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            RDCoders
          </div>
          <div style={{ fontSize: "0.65rem", color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Admin Panel
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {NAV_ITEMS.map((item) => {
          if (item.children) {
            const isOpen = expanded[item.label];
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleSection(item.label)}
                  style={{
                    width: "100%", background: "none", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: "0.6rem",
                    padding: "0.6rem 0.75rem", borderRadius: "8px",
                    color: "#94a3b8", fontSize: "0.875rem", fontWeight: 500,
                    transition: "all 0.2s", textAlign: "left",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#f1f5f9"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#94a3b8"; }}
                >
                  <span style={{ color: "#6366f1", fontSize: "12px" }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  <FaChevronRight style={{ fontSize: "10px", transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "none" }} />
                </button>
                {isOpen && (
                  <div style={{ marginLeft: "1.5rem", marginTop: "0.15rem", display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                    {item.children.map((child) => (
                      <Link
                        key={child.to} to={child.to}
                        onClick={closeSidebar}
                        style={{
                          display: "flex", alignItems: "center", gap: "0.55rem",
                          padding: "0.5rem 0.75rem", borderRadius: "7px", textDecoration: "none",
                          fontSize: "0.835rem", fontWeight: 500,
                          background: isActive(child.to) ? "rgba(99,102,241,0.15)" : "none",
                          color: isActive(child.to) ? "#a5b4fc" : "#64748b",
                          borderLeft: isActive(child.to) ? "2px solid #6366f1" : "2px solid transparent",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => { if (!isActive(child.to)) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#94a3b8"; } }}
                        onMouseLeave={(e) => { if (!isActive(child.to)) { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#64748b"; } }}
                      >
                        <span style={{ fontSize: "10px" }}>{child.icon}</span>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.to} to={item.to}
              onClick={closeSidebar}
              style={{
                display: "flex", alignItems: "center", gap: "0.6rem",
                padding: "0.6rem 0.75rem", borderRadius: "8px", textDecoration: "none",
                fontSize: "0.875rem", fontWeight: 500,
                background: isActive(item.to, item.exact) ? "rgba(99,102,241,0.15)" : "none",
                color: isActive(item.to, item.exact) ? "#a5b4fc" : "#94a3b8",
                borderLeft: isActive(item.to, item.exact) ? "2px solid #6366f1" : "2px solid transparent",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { if (!isActive(item.to, item.exact)) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#f1f5f9"; } }}
              onMouseLeave={(e) => { if (!isActive(item.to, item.exact)) { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#94a3b8"; } }}
            >
              <span style={{ color: isActive(item.to, item.exact) ? "#818cf8" : "#6366f1", fontSize: "13px" }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <button
          onClick={() => { localStorage.clear(); window.location.href = "/"; }}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: "0.6rem",
            padding: "0.6rem 0.75rem", borderRadius: "8px",
            background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)",
            color: "#f87171", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
        >
          <FaSignOutAlt style={{ fontSize: "13px" }} /> Logout
        </button>
      </div>
    </div>
  );
};

const SideBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarStyle = {
    width: 230, minHeight: "100vh", flexShrink: 0,
    background: "linear-gradient(180deg, #080b1a 0%, #0d1124 100%)",
    borderRight: "1px solid rgba(99,102,241,0.12)",
    position: "sticky", top: 0, height: "100vh", overflowY: "auto",
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="d-lg-none"
        onClick={() => setMobileOpen(true)}
        style={{
          position: "fixed", top: "1rem", left: "1rem", zIndex: 1200,
          width: 38, height: 38, borderRadius: "9px",
          background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)",
          color: "#818cf8", display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: "15px",
        }}
      >
        <FaBars />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1299, backdropFilter: "blur(4px)" }}
        />
      )}

      {/* Mobile drawer */}
      <div className="d-lg-none" style={{
        ...sidebarStyle,
        position: "fixed", top: 0, left: 0, zIndex: 1300,
        transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <button
          onClick={() => setMobileOpen(false)}
          style={{
            position: "absolute", top: "1.2rem", right: "1rem",
            background: "none", border: "none", color: "#64748b",
            cursor: "pointer", fontSize: "16px",
          }}
        >
          <FaTimes />
        </button>
        <SidebarContent closeSidebar={() => setMobileOpen(false)} />
      </div>

      {/* Desktop sidebar */}
      <div className="d-none d-lg-block" style={sidebarStyle}>
        <SidebarContent closeSidebar={() => {}} />
      </div>
    </>
  );
};

export default SideBar;
