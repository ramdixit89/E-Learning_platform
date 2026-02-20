import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaCode, FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_BASE_URL;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      Swal.fire("Error", "All fields are required!", "error");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        Swal.fire({ icon: "success", title: "Account Created!", text: "Welcome to RDCoders!", timer: 1500, showConfirmButton: false }).then(() => navigate("/login"));
      } else {
        Swal.fire("Error", result.message || "Registration failed!", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong. Please try again!", "error");
    } finally {
      setLoading(false);
    }
  };

  const perks = [
    "Access 80+ expert-led courses",
    "Earn free certificates",
    "Join 12,000+ learners",
    "Build real-world projects",
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "stretch" }}>
      {/* Left panel */}
      <div className="d-none d-lg-flex" style={{
        width: "45%", background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.1))",
        borderRight: "1px solid var(--border)", padding: "3rem",
        flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden",
      }}>
        {/* Background orbs */}
        <div style={{ position: "absolute", top: "-10%", right: "-10%", width: 350, height: 350, borderRadius: "50%", background: "rgba(99,102,241,0.15)", filter: "blur(100px)" }} />
        <div style={{ position: "absolute", bottom: "5%", left: "-5%", width: 300, height: 300, borderRadius: "50%", background: "rgba(6,182,212,0.1)", filter: "blur(80px)" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", marginBottom: "3rem" }}>
            <div style={{
              width: 42, height: 42, borderRadius: 10,
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

          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", marginBottom: "0.75rem" }}>
            Start Learning<br /><span className="text-gradient">For Free.</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Join thousands of developers who are already building the future.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {perks.map((perk) => (
              <div key={perk} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <FaCheckCircle style={{ color: "#10b981", fontSize: "14px", flexShrink: 0 }} />
                <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{perk}</span>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div style={{
            marginTop: "3rem", background: "rgba(255,255,255,0.04)", borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)", padding: "1.25rem",
          }}>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.7, fontStyle: "italic", marginBottom: "0.75rem" }}>
              "RDCoders transformed my career. I landed a job as a Frontend Developer within 3 months of completing the Full Stack course!"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div className="avatar" style={{ background: "linear-gradient(135deg, #f59e0b, #ec4899)" }}>A</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.8rem" }}>Arjun M.</div>
                <div style={{ color: "var(--text-dim)", fontSize: "0.75rem" }}>Frontend Developer @ Tech Startup</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1.5rem" }}>
        <div style={{ width: "100%", maxWidth: 420, animation: "fadeInUp 0.5s ease" }}>

          {/* Mobile logo */}
          <Link to="/" className="d-lg-none" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", marginBottom: "2rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #6366f1, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FaCode style={{ color: "white", fontSize: "14px" }} />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, background: "linear-gradient(90deg, #818cf8, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              RDCoders
            </span>
          </Link>

          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", marginBottom: "0.4rem" }}>
            Create your account
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "2rem" }}>
            It's free. No credit card required.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <div>
              <label className="form-label-custom">Full Name</label>
              <div className="input-wrapper">
                <FaUser className="icon" style={{ fontSize: "12px" }} />
                <input type="text" name="username" className="input-field" placeholder="John Doe" value={formData.username} onChange={handleChange} required />
              </div>
            </div>

            <div>
              <label className="form-label-custom">Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="icon" style={{ fontSize: "12px" }} />
                <input type="email" name="email" className="input-field" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div>
              <label className="form-label-custom">Password</label>
              <div className="input-wrapper">
                <FaLock className="icon" style={{ fontSize: "12px" }} />
                <input type="password" name="password" className="input-field" placeholder="Min 8 characters" value={formData.password} onChange={handleChange} required />
              </div>
            </div>

            <button type="submit" className="btn-primary-custom" style={{ width: "100%", justifyContent: "center", padding: "0.85rem", fontSize: "0.95rem", marginTop: "0.5rem" }} disabled={loading}>
              {loading ? "Creating Account..." : <><span>Create Account</span> <FaArrowRight /></>}
            </button>
          </form>

          <div className="divider" style={{ margin: "1.5rem 0" }} />
          <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--text-muted)", margin: 0 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#818cf8", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
