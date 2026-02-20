import React from "react";
import { Link } from "react-router-dom";
import {
  FaGithub, FaTwitter, FaLinkedin, FaYoutube,
  FaEnvelope, FaMapMarkerAlt, FaPhone, FaCode
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  const links = {
    Platform: [
      { label: "Home", to: "/" },
      { label: "Courses", to: "/courses" },
      { label: "Blog", to: "/blogs" },
      { label: "Certificate", to: "/certificate" },
    ],
    Company: [
      { label: "About Us", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Privacy Policy", to: "/" },
      { label: "Terms of Service", to: "/" },
    ],
  };

  const socials = [
    { Icon: FaGithub, href: "#", label: "GitHub" },
    { Icon: FaTwitter, href: "#", label: "Twitter" },
    { Icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { Icon: FaYoutube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="footer">
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div className="row g-5">

          {/* Brand Column */}
          <div className="col-lg-4">
            <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", marginBottom: "1.25rem" }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 20px rgba(99,102,241,0.35)",
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

            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Empowering developers worldwide with expert-led courses, real-world projects, and industry-recognized certificates.
            </p>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label} href={href} aria-label={label}
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "var(--surface-2)", border: "1px solid var(--border)",
                    color: "var(--text-dim)", fontSize: "14px", transition: "all 0.2s ease", textDecoration: "none",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.12)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"; e.currentTarget.style.color = "#818cf8"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface-2)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-dim)"; }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(links).map(([category, items]) => (
            <div className="col-lg-2 col-6" key={category}>
              <h6 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.875rem", color: "var(--text)", marginBottom: "1.25rem", letterSpacing: "0.02em" }}>
                {category}
              </h6>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      style={{ color: "var(--text-dim)", fontSize: "0.875rem", textDecoration: "none", transition: "all 0.2s ease" }}
                      onMouseEnter={(e) => e.target.style.color = "#818cf8"}
                      onMouseLeave={(e) => e.target.style.color = "var(--text-dim)"}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="col-lg-4">
            <h6 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.875rem", color: "var(--text)", marginBottom: "1.25rem" }}>
              Stay Updated
            </h6>
            <p style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginBottom: "1rem" }}>
              Get the latest courses, tutorials and tech news delivered to your inbox.
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1, background: "var(--surface-2)", border: "1px solid var(--border)",
                  borderRadius: "10px", color: "var(--text)", padding: "0.6rem 1rem",
                  fontSize: "0.875rem", outline: "none", transition: "all 0.2s ease",
                }}
                onFocus={(e) => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
              />
              <button
                className="btn-primary-custom"
                style={{ padding: "0.6rem 1.1rem", borderRadius: "10px", fontSize: "0.85rem", whiteSpace: "nowrap" }}
              >
                Subscribe
              </button>
            </div>

            {/* Contact Info */}
            <div style={{ marginTop: "1.75rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { Icon: FaMapMarkerAlt, text: "Indore, Madhya Pradesh" },
                { Icon: FaEnvelope, text: "support@rdcoders.com" },
                { Icon: FaPhone, text: "+91 98765 43210" },
              ].map(({ Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--text-dim)", fontSize: "0.825rem" }}>
                  <Icon style={{ color: "#6366f1", fontSize: "12px", flexShrink: 0 }} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: "1px solid var(--border)", marginTop: "3rem", paddingTop: "1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
        }}>
          <p style={{ color: "var(--text-dim)", fontSize: "0.8rem", margin: 0 }}>
            © {year} <span style={{ color: "#818cf8" }}>RDCoders</span>. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((item) => (
              <a key={item} href="#" style={{ color: "var(--text-dim)", fontSize: "0.8rem", textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => e.target.style.color = "#818cf8"}
                onMouseLeave={(e) => e.target.style.color = "var(--text-dim)"}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;